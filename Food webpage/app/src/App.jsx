import styled from 'styled-components'
import { useEffect, useState } from 'react'
import SearchResult from './components/SearchResult'
export const BASE_URL = "http://localhost:9000"


function App() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState(null)
  const [selectedBtn, setSelectedBtn] = useState("all")

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true)
      try {
        const res = await fetch(BASE_URL)
        const json = await res.json()
        setData(json)
        setFilter(json)
        setLoading(false)
      } catch (error) {
        setError("fetch problem please fix that")
      }
    }
    fetchFoodData()
  }, [])

  const searchFood = (e) => {
    const searchValue = e.target.value

    if (searchValue === "") {
      setFilter(null)
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilter(filter)
  }

  const filtered = (type) => {
    if (type === "all") {
      setFilter(data);
      setSelectedBtn("all")
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilter(filter);
    setSelectedBtn(type)
  }

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ]


  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...............</div>;

  return (
    <>

      <Container>
        <TopContainer>
          <div>
            <img src="../public/Top.png" alt="" />
          </div>
          <div className="search">
            <input onChange={searchFood} className='search' type="text " placeholder='search food' />
          </div>
        </TopContainer>

        <FilterContainer>
          {
            filterBtns.map((value) => (
              <Button key={value.name}
                onClick={() => filtered(value.type)}>
                {value.name}
              </Button>
            ))}
        </FilterContainer>

      </Container>
      <SearchResult data={filter} BASE_URL={BASE_URL} />


    </>
  )
}

export default App

export const Container = styled.div`
max-width:1200px;
// background:white;
margin:0 auto;
`;

const TopContainer = styled.section`
height:140px;
display:flex;
justify-content:space-between;
padding:15px;
align-items:center;


.search {
    input{
    background-color:transparent;
    border:1px solid red;
    color:white;  
    border-radius:5px;
    height:40px;
    font-size:15px;
    padding:0 10px;
    &::placeholder{
    color:white;
    }
    }
}


@media(0 < width < 600px) {
  flex-direction: column;
  height:5%;  
}

`;

const FilterContainer = styled.section`
display:flex;
justify-content:center;
gap:12px;
padding-bottom:40px
`;

export const Button = styled.button`
background:#ff4343;
border-radius:5px;
padding:6px 15px;
color:white;
border:none;
cursor:pointer;

&:hover {
background-color:#f22f22;
}
`;


