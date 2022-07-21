import { useEffect, useState } from "react";
import postAPI from "../config/api"
const Travels = () => {
  const initialForm = {
    image: null,
    description: "",
  };
  const [formState, setFormState] = useState(initialForm);
  const [list, setList] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    list.push(event.target.description.value)
    console.log(list)
  };

  const handleChangeDescription = (event) => {
    // console.log(event.target.value);
    setFormState(event.target.value);
  };

  const listItems = list.map((item) => {
    return <li>{item}</li>
  })

async function getPosts(){
  const response = await postAPI.get('/posts')
  for (const property in response.data) {
    console.log(`${property}: ${response.data[property]}`);
  }
  
}


  return (
    <>
      <h1>Travels page</h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label>
            Image
            <input type="file" />
          </label>
          <input
            id="description"
            name="description"
            type="textarea"
            onChange={handleChangeDescription}
            placeholder="Description"
            value={formState.description}
          />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <p>The list is here: {list && listItems }</p>
      </div>
    </>
  );
};

export default Travels;
