import React, { useEffect, useState } from "react";
import axios from "axios";



function Todo() {

    const [itemText, setItemText] = useState('')
    const [listItems, setListItem] = useState([])
    const [isUpdate, setIsUpdate] = useState('')
    const [updateItemText, setUpdateItemText] = useState('')
    const addItem = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("http://localhost:5500/user/api/item", { item: itemText })
            // console.log(res);       
            setListItem(prev => [...prev, res.data])
            setItemText('')
        } catch (err) {
            console.log(err)
        }
    }


    //create function to fetch all to items from database -- we wil use useEffect hook

    useEffect(() => {
        const getItemList = async () => {
            try {
                const res = await axios.get("http://localhost:5500/user/api/items")
                setListItem(res.data)
                console.log('render')

            } catch (err) {
                console.log(err)
            }
        }
        getItemList();
    }, [])

    //Delete item when click on delete button

    const deleteItem = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5500/user/api/item/${id}`)
            console.log(res.data);
            const newListItems = listItems.filter(item => item._id !== id);
            setListItem(newListItems);
        } catch (err) {
            console.log(err)
        }
    }

    //Update

    const updateItem = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5500/user/api/item/${isUpdate}`, { item: updateItemText })
            console.log(res.data)
            const updatedItemIndex = listItems.findIndex(item => item._id === isUpdate)
            const updatedItem = listItems[updatedItemIndex].item = updateItemText;
            setUpdateItemText('')
            setIsUpdate('')
            console.log(updatedItem)

        } catch (err) {
            console.log(err)
        }
    }

    //before updating item we need to show input filed where we will create our update item

    const renderUpdatedForm = () => {
        return (
            <form className="update-form" onSubmit={e => { updateItem(e) }} >
                <input type="text" className="update-new-input" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
                <button className="update-new-btn" type="submit" >Update</button>
            </form>
        )
    }



    // Main Component 

    return (
        <div className="container" >
            <h1>Todo List</h1>
            <form className="form" onSubmit={e => addItem(e)} >
                <input type="text" placeholder="Add Todo Item" onChange={e => { setItemText(e.target.value) }} value={itemText} />
                <button type="submit" >Add</button>
            </form>
            <div className="todo-listItems" >
                {
                    listItems.map(item => (
                        <div className="todo-item" key={item._id} >
                            {
                                isUpdate === item._id
                                    ? renderUpdatedForm()
                                    : <>
                                        <p className="item-content">{item.item}</p>
                                        <button className="update-item" onClick={() => { setIsUpdate(item._id) }} >Update</button>
                                        <button className="delete-item" onClick={() => { deleteItem(item._id) }} >Delete</button>
                                    </>
                            }
                        </div>
                    ))
                }




                {/* <div className="todo-item" >
                    <p className="item-content" >this is the item</p>
                    <button className="update-item" >Update</button>
                    <button className="delete-item" >delete</button>
                </div>
                <div className="todo-item" >
                    <p className="item-content" >this is the item</p>
                    <button className="update-item" >Update</button>
                    <button className="delete-item" >delete</button>
                </div>
                <div className="todo-item" >
                    <p className="item-content" >this is the item</p>
                    <button className="update-item" >Update</button>
                    <button className="delete-item" >delete</button>
                </div> */}
            </div>
        </div>
    )
}

export default Todo;