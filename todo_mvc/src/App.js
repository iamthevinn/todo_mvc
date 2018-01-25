import React, { Component } from 'react';
import './App.css';

const ListItem = (props) => {
  let item;
  if (!props.todo.inEditMode) {
  item = (<div className="listItem">
                <div className="container">
                  <div className="round">
                    <input type="checkbox" id={props.id.toString()} />
                    <label htmlFor={props.id.toString()}></label>
                  </div>
                </div>
                <div className="nonCompletedText" onDoubleClick={() => {props.enterEditMode(props.id)}} >{props.todo.todoText}</div>
                <div className="deleteButton" onClick={() => props.handleRemoveItem(props.id)}>X</div>
              </div>)

  if (props.todo.complete)
    item = (<div className="listItem">
              <div className="container">
                <div className="round">
                  <input type="checkbox" id={props.id.toString()} />
                  <label htmlFor={props.id.toString()}></label>
                </div>
              </div>
              <div className="completedText">{props.todo.todoText}</div>
              <div className="deleteButton" onClick={() => props.handleRemoveItem(props.id)}>X</div>
            </div>)
  } else {
    item = (<div className="listItem">
    <input type="text" className="editingText" autoFocus onBlur={() => {props.saveModifiedOnblur(props.id)}} onKeyUp={(event) => {props.saveModifiedInput(props.id,event)}} onChange={(event) => props.handleInlineInput(props.id, event)} value={props.todo.todoText} ></input>
  </div>)

if (props.todo.complete)
item = (<div className="listItem">
    <input type="text" className="editingText" autoFocus onBlur={() => {props.saveModifiedOnblur(props.id)}} onKeyUp={(event) => {props.saveModifiedInput(props.id,event)}} onChange={(event) => props.handleInlineInput(props.id, event)} value={props.todo.todoText} ></input>
  </div>)
  }
  return (
    <div id={props.id} >
      {item}
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App" >
        <h1>ToDo</h1>

        <MainBody></MainBody>
        <br />
        <br />
        <br />
        <br />
        <br />
        <footer>
          <div>double click to edit</div>
          <div>Created by Team V</div>
          <div>NM Coding Dojo</div>
        </footer>
      </div>
    );
  }
}

class MainBody extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      inputboxtext: "",
      todoItems: [{todoText: "todo 1", complete: false, inEditMode: true}, {todoText: "todo 1", complete: false, inEditMode: false}] // {todoText: "todo 1", complete: false, inEditMode: true}, {todoText: "todo 1", complete: false, inEditMode: false}
    }
    this.handleTextboxinput = this.handleTextboxinput.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.enterEditMode = this.enterEditMode.bind(this)
    this.handleInlineInput = this.handleInlineInput.bind(this)
    this.saveModifiedInput = this.saveModifiedInput.bind(this)
    this.saveModifiedOnblur = this.saveModifiedOnblur.bind(this)
  }
  
  handleTextboxinput(event) {
    if(event.key === 'Enter') {
      let listItem = {todoText: event.target.value, complete: false, inEditMode: false}
      let tempArray = this.state.todoItems
      tempArray.push(listItem)
      this.setState({todoItems: tempArray, inputboxtext: ""})
    }else{
      this.setState({inputboxtext: event.target.value})
    }

  }

  handleInlineInput(rowId, event) {

    console.log(event.key)
      let tempArray = this.state.todoItems
      tempArray[rowId].todoText = event.target.value
      this.setState({inputboxtext: event.target.value})
  }

  saveModifiedInput(rowId, event) {
    if(event.key === 'Enter') {
      let tempArray = this.state.todoItems
      //tempArray[rowId].todoText = event.target.value
      tempArray[rowId].inEditMode = false;
      this.setState({todoItems: tempArray})
    }
  }

  saveModifiedOnblur(rowId){
    let tempArray = this.state.todoItems
    //tempArray[rowId].todoText = event.target.value
    tempArray[rowId].inEditMode = false;
    this.setState({todoItems: tempArray})
  }

  handleRemoveItem(rowId) {
    let tempArray = this.state.todoItems;
    tempArray.splice(rowId,1)
    this.setState({todoItems: tempArray})
  }

  enterEditMode(rowId) {
    console.log("in edit on line: " + rowId)
    let tempArray = this.state.todoItems;
    tempArray[rowId].inEditMode = true;
    this.setState({todoItems: tempArray})
  }

  render() {
    // todo clear input box after enter
    console.log(this.state.todoItems.length)
    const listOfItems = this.state.todoItems.map((todo, indx) => (
      <ListItem key={indx} id={indx} todo={todo} handleRemoveItem={this.handleRemoveItem} saveModifiedInput={this.saveModifiedInput} handleInlineInput={this.handleInlineInput} enterEditMode={this.enterEditMode} saveModifiedOnblur={this.saveModifiedOnblur}/>
    ))
    console.log(listOfItems)


    return (
     <div> 
        <input className="inputBox" type="text" value={this.state.inputboxtext} onChange={this.handleTextChange} onKeyUp={this.handleTextboxinput}></input>
        {this.state.todoItems.length > 0 ? <div className="listContainer"><div >{listOfItems}</div></div> : ""} 
     </div>
    )
      }
    }
  


export default App;
