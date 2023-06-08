    // Charts:
    // Categorias mas vendidas (Pie chart)
    // Marcas mas vendidas (Pie chart)
    // Motos mas vendidas (Bar chart)

import React, { useEffect, useState } from 'react';
import { Pie, PieChart, Cell, Tooltip, Legend, XAxis, YAxis, Bar, BarChart, CartesianGrid } from 'recharts';
import axios from "axios"
const PieChartExample = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [soldMotos, setSoldMotos] = useState([])
    const [soldCategories, setSoldCategories] = useState([])
    const [soldBrands, setSoldBrands] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST_NAME}/items/sold`)
        .then(d => {
            console.log(d.data);
            const auxMotosObj = {}
            const auxCategories=  {}
            const auxBrands = {}
            d.data.forEach(m => {
                const {brand, model, cc, price, category} = m.motorcycle
                if(auxMotosObj[`${brand} ${model} ${cc}`]){
                    auxMotosObj[`${brand} ${model} ${cc}`].price += price
                }else{
                    auxMotosObj[`${brand} ${model} ${cc}`] = {name: `${brand} ${model} ${cc}`, price}
                }

                if(auxCategories[category]){
                    auxCategories[category].price += price
                }else{
                    auxCategories[category] = {name: category, price}
                }

                if(auxBrands[brand]){
                    auxBrands[brand].price += price
                }else{
                    auxBrands[brand] = {name: brand, price}
                }
            })
            setSoldMotos(Object.values(auxMotosObj).slice(0,5))
            setSoldCategories(Object.values(auxCategories).slice(0,5))
            setSoldBrands(Object.values(auxBrands).slice(0,5))
    })
    }, [])

    const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
    };

    const handleMouseLeave = () => {
    setActiveIndex(null);
    };

    
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#FF00FF"];

    return (<>
    <PieChart width={400} height={400}>
        <Pie
        data={soldMotos}
        dataKey="price"
        cx={200}
        cy={200}
        outerRadius={150}
        fill="#8884d8"
        paddingAngle={1}
        activeIndex={activeIndex}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        {soldMotos?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
    </PieChart>
    <PieChart width={400} height={400}>
        <Pie
        data={soldCategories}
        dataKey="price"
        cx={200}
        cy={200}
        outerRadius={150}
        fill="#8884d8"
        paddingAngle={1}
        activeIndex={activeIndex}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        {soldCategories?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
    </PieChart>
    <BarChart width={500} height={400} data={soldBrands}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar
    dataKey="price"
    fill="#8884d8"
    >
    {soldBrands?.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
    </Bar>
</BarChart>
    </>
    );
};

export default PieChartExample;
    