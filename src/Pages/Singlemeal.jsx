
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import Loading from '../components/Loading'

const Singlemeal = () => {
  const { mealId } = useParams()
  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
  const finalUrl = url + mealId
  const [ loading, setLoading ] = useState(true)
  const [meal, setMeal] = useState(null)
  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(finalUrl)
    const data = await res.json()
    if (data.meals) {
    const {
      strMeal : name, strCategory : cat, strArea : area, strInstructions : instruction, strMealThumb : image, strYoutube : youtube, strTags: tags,
      } = data.meals[0]
      const newMeal = {
        name,cat,area,instruction,image,youtube,tags,
      }
      setMeal(newMeal)
    } else {
      setMeal(null)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [mealId] )
 
  if (loading) {
    return <Loading/>
  }
  if (!meal) {
    return <h2>FOOD E NO DEY, BROTHER WATER NO DEY</h2>
  }

  return (
    <div className='container mt-2'>
      <div>
        <img className='w-100' style={{height: '400px', objectFit: 'cover'}} src={meal.image} alt={meal.name} />
        <div className="mt-3 mb-3">
          <p>
            <span className="bg-success text-white p-1 me-2 fw-bolder">Name:</span>
            {meal.name}
          </p>
          <p>
            <span className="bg-success text-white p-1 me-2 fw-bolder">Category:</span>
            {meal.cat}
          </p>
          <p>
            <span className="bg-success text-white p-1 me-2 fw-bolder ">Tags:</span>
            {meal.tags}
          </p>
          <p>
            <span className="bg-success text-white p-1 me-2 fw-bolder ">Area:</span>
            {meal.area}
          </p>
          
          <p className='lh-lg'>
            <span className="bg-success text-white p-1 me-2 fw-bolder">Instructions:</span>
            {meal.instruction}
          </p>
          <ReactPlayer url = {meal.youtube} controls= {true} playing ={true} muted={true}/>


        </div>
      </div>
    </div>
  )
}

export default Singlemeal