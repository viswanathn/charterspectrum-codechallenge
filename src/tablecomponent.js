import React from 'react';
import SearchComponent from './SearchComponent'
class Tablecomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            filtervalue: [],
            filterText: '',
            searchClick:false,
            filterRecords:[]
        };
    }
    compare(a, b) {
        const bandA = a.name.toUpperCase();
        const bandB = b.name.toUpperCase();
      
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      }
    componentDidMount() {
        fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
            method: 'GET',
            headers: {
                'Authorization': 'Api-Key q3MNxtfep8Gt',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.sort(this.compare.bind(this)),
                        filtervalue: result.sort(this.compare.bind(this))
                    });
                    {this.pagebutton('e',1)}
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    // filterItems(v) {
    //     this.setState({
    //         filterText: (v)?v.toLowerCase():v
    //     });
       

    // }

    handleSetSearchInput = searchInput => {
        this.setState({ filterText:searchInput });
      };


    getItems(){
        const v = this.state.filterText;
        if (v) {
           
          
                this.setState({
                    searchClick:true,
                 
                  });
              
           
        } else {
            this.setState({
                searchClick:false
            })
            
        }
        this.pagebutton('e',1);
    }
    pagebutton(e,u){
        
        const c = this.state.filterText?this.state.filterRecords.slice(0,this.state.filterRecords.length):this.state.items.slice(0,this.state.items.length);
        if(u === 1){
            if(c.length > 10){
                const x = c.splice(0,10);
                this.setState({
                    filtervalue: x
                });
            }else{
                const x = c;
            setTimeout(function () {
                this.setState({
                    filtervalue: x
                  });
              }.bind(this), 1200)
            }
            
        }else{
            const x = c.splice((u -1)*10,10);
        this.setState({
            filtervalue: x
        });
        }
        
    }

    handleSetFilteredData = filteredData => {
        this.setState({ filterRecords: filteredData });
       // this.pagebutton('e',1);
      };

    render() {
        const { error, isLoaded, items, filtervalue, filterText } = this.state;
        
        const mystyle = {
            border: '1px solid',
            fontFamily: "Arial"
        };
        const mybuttonstyle = {
            padding:'15px 30px 15px 30px',
            marginTop:'20px'
        }
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const gx = []; 
            if(this.state.searchClick){
                const g = Math.ceil(this.state.filterRecords.length/10);
                gx.length = 0;
                for(let i = 1;i<=g;i++){
                    gx.push(<button style={mybuttonstyle} key={i} onClick = {e => this.pagebutton(e,i)}>{i}</button>)
                }
            }else{
                const g = Math.ceil(this.state.items.length/10);
                gx.length = 0;
                for(let i = 1;i<=g;i++){
                    gx.push(<button style={mybuttonstyle} key={i} onClick = {e => this.pagebutton(e,i)}>{i}</button>)
                }
            }
            
           
            return (
                <div>
                    <div style={{ textAlign: 'left' }}>
                    <SearchComponent
          data={this.state.filtervalue}
          handleSetSearchInput= {this.handleSetSearchInput}
          handleSetFilteredData={this.handleSetFilteredData}
          
        />
                        {/* <input type="text" placeholder='Search by name or city or genre' style={{ padding: '10px', margin: '10px',width:'300px' }} onChange={e => this.filterItems(e.target.value)}></input> */}
                        <button type='submit' onClick = {e => this.getItems(e)} style={{ padding: '10px'}}>Search</button>
                    </div>
                    <table style={{width:'100%'}}>
                        <tr style={mystyle}>
                            <th style={mystyle}>Name</th>
                            <th style={mystyle}>City</th>
                            <th style={mystyle}>State</th>
                            <th style={mystyle}>Phone Number</th>
                            <th style={mystyle}>Genres</th>
                        </tr>
                        {
                                filtervalue.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={mystyle}>{item.name}</td>
                                            <td style={mystyle}>{item.city}</td>
                                            <td style={mystyle}>{item.state}</td>
                                            <td style={mystyle}>{item.telephone}</td>
                                            <td style={mystyle}>{item.genre}</td>
                                        </tr>
                                    );
                                })
                            
                            }
                        

                    </table>
                    <div>{gx}</div>
                </div>

            );
        }
    }
}
export default Tablecomponent;