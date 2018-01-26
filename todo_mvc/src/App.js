import React, { Component } from 'react';
import './App.css';

const ListItem = (props) => {
  let item;
  if (!props.todo.inEditMode) {
  item = (<div className="listItem">
                <div className="container">
                  <div className="round">
                    <input checked={props.todo.complete} onChange={() => {props.toggleComplete(props.id)}} type="checkbox" id={props.id.toString() + "checkbox"} />
                    <label htmlFor={props.id.toString() + "checkbox"}></label>
                  </div>
                </div>
                <div className="nonCompletedText" onDoubleClick={() => {props.enterEditMode(props.id)}} >{props.todo.todoText}</div>
                <div className="deleteButton" onClick={() => props.handleRemoveItem(props.id)}>X</div>
              </div>)

  if (props.todo.complete)
    item = (<div className="listItem">
              <div className="container">
                <div className="round">
                  <input checked={props.todo.complete} onChange={() => {props.toggleComplete(props.id)}} type="checkbox" id={props.id.toString() + "checkbox"} />
                  <label htmlFor={props.id.toString() + "checkbox"}></label>
                </div>
              </div>
              <div className="completedText" onDoubleClick={() => {props.enterEditMode(props.id)}} >{props.todo.todoText}</div>
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
      todoItems: [] // {todoText: "todo 1", complete: false, inEditMode: true}, {todoText: "todo 1", complete: false, inEditMode: false}
    }
    this.handleTextboxinput = this.handleTextboxinput.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.enterEditMode = this.enterEditMode.bind(this)
    this.handleInlineInput = this.handleInlineInput.bind(this)
    this.saveModifiedInput = this.saveModifiedInput.bind(this)
    this.saveModifiedOnblur = this.saveModifiedOnblur.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
  }

  toggleComplete(rowId) {
    let tempArray = this.state.todoItems
    if (tempArray[rowId].complete)
      tempArray[rowId].complete = false;
    else
      tempArray[rowId].complete = true;
    this.setState({todoItems: tempArray})
  }
  
  handleTextboxinput(event) {
      this.setState({inputboxtext: event.target.value})
  }

  handleEnter(event) {
    if(event.key === 'Enter') {
      let listItem = {todoText: event.target.value, complete: false, inEditMode: false}
      let tempArray = this.state.todoItems
      tempArray.push(listItem)
      this.setState({todoItems: tempArray, inputboxtext: ""})
    }
  }

  handleInlineInput(rowId, event) {
      let tempArray = this.state.todoItems
      tempArray[rowId].todoText = event.target.value
      this.setState({todoItems: tempArray})
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
    let tempArray = this.state.todoItems;
    tempArray[rowId].inEditMode = true;
    this.setState({todoItems: tempArray})
  }

  render() {
    const listOfItems = this.state.todoItems.map((todo, indx) => (
      <ListItem key={indx} id={indx} todo={todo} toggleComplete={this.toggleComplete} handleRemoveItem={this.handleRemoveItem} saveModifiedInput={this.saveModifiedInput} handleInlineInput={this.handleInlineInput} enterEditMode={this.enterEditMode} saveModifiedOnblur={this.saveModifiedOnblur}/>
    ))

    return (
     <div> 
        <input className="inputBox" type="text" value={this.state.inputboxtext} onChange={this.handleTextboxinput} onKeyUp={this.handleEnter}></input>
        {this.state.todoItems.length > 0 ? <div className="listContainer"><div >{listOfItems}</div></div> : ""} 
     </div>
    )
      }
    }
  


export default App;
