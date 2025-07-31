import { useState } from 'react';

class Item {
  id = Math.random() + '-' + Date.now();
  checked = false;
  text = '-default-';
  constructor(text) {
    Object.assign(this, { text }); //this.text = text;
  }
}


export function ToDoApp() {
  console.log('ToDo render');
  const
    [list, setList] = useState([new Item('Дело 1'), new Item('Дело 2')]),
    addItem = text =>
      setList(prev => [...prev, new Item(text)]),
    delItem = id => setList(prev => prev.filter(el => id !== el.id))


  return <>
    <Form addItem={addItem} />
    <List list={list} delItem={delItem} />
  </>
}

function Button({ onClick, children }) {
  console.log('Button render');
  return <button onClick={onClick}>{children}</button>
}

function Form({ addItem }) {
  const
    [value, setValue] = useState('-text-');
  console.log('Form render');
  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={event => setValue(event.target.value)} />
    <Button onClick={() => addItem(value)}>Add</Button>
  </fieldset>
}

function List({ list, delItem }) {
  console.log('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <ToDoItem key={item.id} item={item} delItem={delItem} />)}
    </ol>
  </fieldset>
}


/**
 * 
 * @param {object} props
 * @param {Item} props.item
 * @returns {JSX.Element}
 */
function ToDoItem({ item, delItem }) {
  console.log('Item render');
  return <li>
    <input type="checkbox" checked={item.checked} />
    {item.text}
    {item.checked && '✔'}
    <Button onClick={() => delItem(item.id)}>❌</Button>
  </li>
}





