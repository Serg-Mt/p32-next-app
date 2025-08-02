import { memo, useCallback, useRef, useState } from 'react';

const
  ADD = 'add',
  DEL = 'del',
  TOGGLE = 'toggle';

class Item {
  id = Math.random() + '-' + Date.now();
  checked = false;
  text = '-default-';
  constructor(text) {
    Object.assign(this, { text }); //this.text = text;
  }


  toggleCheck() {
    return Object.assign(new Item, this, { checked: !this.checked });
  }
}

const Button = memo(function Button({ action, id, children }) {
  console.log('Button render', children);
  return <button data-action={action} data-id={id}>{children}</button>
});

/**
 * 
 * @param {object} props
 * @param {Item} props.item
 * @returns {JSX.Element}
 */
function ToDoItem({ item }) {
  console.log('Item render', item.text);
  return <li>
    <input type="checkbox" checked={item.checked} data-action={TOGGLE} />
    {item.text}
    {item.checked && '✔'}
    <Button action={DEL} id={item.id}> ❌</Button>
  </li>
}

const ToDoItemPure = memo(ToDoItem);



const Form = memo(function Form({ inputRef }) {

  console.log('Form render');
  return <fieldset>
    <legend>Form2</legend>
    <input ref={inputRef} />
    <Button action={ADD}>➕</Button>
  </fieldset>
});

export function ToDoApp() {
  console.log('ToDoApp render');
  const
    [list, setList] = useState([new Item('Дело 1'), new Item('Дело 2')]),
    inputRef = useRef(null);
  // addItem = useCallback(text => setList(prev => [...prev, new Item(text)]), []),
  // delItem = useCallback(id => setList(prev => prev.filter(el => id !== el.id)), []),
  // toggleCheck = useCallback(id => setList(prev => {
  //   const
  //     index = prev.findIndex(el => id === el.id),
  //     elem = prev[index];
  //   return prev.with(index, elem.toggleCheck());
  // }), []);
  const onClick = event => {
    const
      { target } = event,
      actionTarget = target.closest('[data-action]');
    if (!actionTarget)
      return;
    const { action, id } = actionTarget.dataset;
    console.log({ target, actionTarget, action, id });
    switch (action) {
      case ADD:
        setList(prev => [...prev, new Item(inputRef.current.value)]);
        return;
      case DEL:
        setList(prev => prev.filter(el => id !== el.id))
        return;

      case TOGGLE:
    }
  }


  return <fieldset onClick={onClick}>
    <legend>ToDoApp</legend>
    <Form inputRef={inputRef} />
    <List list={list} />
  </fieldset>
}




function List({ list }) {
  console.log('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <ToDoItemPure key={item.id} item={item} />)}
    </ol>
  </fieldset>
}








