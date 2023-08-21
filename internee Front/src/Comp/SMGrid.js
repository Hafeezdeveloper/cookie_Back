import React from 'react'

const SMGrid = (props) => {
    let {data,cols} = props

  return (
    <div>
        {data && Array.isArray(data) &&(
            <table>
                <thead>
                    {cols && cols.map((x,i) =>{
                        return(
                            <th key={i}>{x.name}</th>
                        )
                    })}
                </thead>
                <tbody>
                    {data && data.map( (item,ind) =>{
                        <tr>
                            {cols.map( (x,i) =>{
                                return(
                                    <td>{x.displayFeild ? x.displayFeild(item) : item[x.key] }</td>
                                )
                            })}
                        </tr>
                    })}
                </tbody>
            </table>

        )}
    </div>
  )
}

export default SMGrid
