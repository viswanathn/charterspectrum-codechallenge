import React from "react";


export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      searchInput: ""
    };
  }

  handleChange = event => {

    const val = event.target.value;
    this.setState({ searchInput: val }, () => this.globalSearch());
    if(event.charCode === 13){
        this.props.handleSetSearchInput(val,'enter');
    }else{
        this.props.handleSetSearchInput(val);
    }
   
  };

  globalSearch = () => {
    const { searchInput,stateColumnSearch } = this.state;
    let filteredData = this.props.data.filter(value => {
      if (stateColumnSearch) {
        return value.state
          .toString()
          .toLowerCase()
          .includes(stateColumnSearch.toLowerCase());
      }else{
        return (
          value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.city.toLowerCase().includes(searchInput.toLowerCase()) ||
       
          value.genre
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      }
     
    });

    this.props.handleSetFilteredData(filteredData);
  };

  setStateColumnSearch = e => {
    this.props.handleSetSearchInput(e.target.value);
    this.setState({ stateColumnSearch: e.target.value }, () => this.globalSearch());
  };

 
  render() {
    const { columns } = this.props;
    const { stateColumnSearch, } = this.state;

    return (
      <>
        <br />

        <input type="text" placeholder='Search by name or city or genre' style={{ padding: '10px', margin: '10px',width:'300px' }}
         onChange={e => this.handleChange(e)} onKeyPress={e=>this.handleChange(e)}></input>

        {/* <Input
          size="large"
          name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          label="Search"
        /> */}

       
       
      </>
    );
  }
}
