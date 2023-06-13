import styles from "./CreateImageForm.module.scss"
import {  useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import axios from "axios"

export default function CreateImageForm() {
  
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal)

  const currentOrder = useSelector(state => state.currentOrder)
  const [image, setImage] = useState("")
  const [inputs, setInputs] = useState({
    brand: "BMW",
    motorcycle: "R1250GS",
    color: "Red",
    style: "",
    background: "",
  })
  const [background, setBackground] = useState([
    "Interstellar Nebula",
    "Lost Jungle Ruins",
    "Ultra-Modern Cityscape",
    "Deserted Ghost Town",
    "Subterranean Crystal Cavern",
    "Victorian Cobblestone Street",
    "Translucent Ice Castle",
    "Vast Alien Desert",
    "Ancient Library Interior",
    "Underwater Atlantis",
  ])
  const [style, setStyle] = useState([
    "Reinassance Elegance",
    "Modernist Minimalis",
    "Psychedelic Extravaganza",
    "Impressionist Serenity",
    "Cyberpunk Futurism",
    "Art Nouveau Fantasy",
    "Cubist Abstraction",
    "Japanese Ukiyo-e",
    "Gothic Noir",
    "Pop Art Extravaganza",
  ])

  useEffect(() => {
    setInputs({
      ...inputs,
      color: currentOrder.color,
      motorcycle: currentOrder.motorcycle.model,
      brand: currentOrder.motorcycle.brand})
    }, [currentOrder])

  async function handleSumbitImage(e) {
    e.preventDefault()

    const generateImage = await axios.post(
      `${process.env.REACT_APP_HOST_NAME}/openAI/generateImage`,
      inputs
    )
    setImage(generateImage.data.image)
  }

  function handleChange(e) {
    let inputsAux = { ...inputs, [e.target.name]: e.target.value }
    setInputs(inputsAux)
  }

  return (
    <>
      <div className={styles["form-container"]}>
        <section className={styles["my-form-box"]}>
          <form className={styles["my-form"]} onSubmit={handleSumbitImage}>
            <section className={styles["item-info"]}>
              <h2>Congratulations on your purchase! Let's celebrate generating a cool image of your new {currentOrder.motorcycle.brand} {currentOrder.motorcycle.model}</h2>
              <div>
                <label for="style">Style</label>
                <select
                  name="style"
                  onChange={handleChange}
                  value={inputs.style}>
                  <option></option>
                  {style.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label for="background">Background</label>
                <select
                  name="background"
                  onChange={handleChange}
                  value={inputs.background}>
                  {" "}
                  <option></option>
                  {background.map(b => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </section>
            <input type="submit" value="Submit" />
          </form>
        </section>
        {image && (
          <div className={styles["my-image-box"]}>
            <img src={image} alt="generated image" />
          </div>
        )}
      </div>
    </>
  )
}
