import React, { Component } from 'react'
import TechItem from './TechItem'


export class TechList extends Component {
    state = {
        newTech:"",
        techs:[]
    };

    componentDidMount(){
        const techs = localStorage.getItem("tech");
        if(techs){
            this.setState({techs:JSON.parse(techs)});
        }
    }

    componentDidUpdate(prevProps,prevStates){
        if(prevStates.techs != this.state.techs){
            localStorage.setItem("tech",JSON.stringify(this.state.techs));
        }
    }

    handleInputChange = e => {
        this.setState({newTech: e.target.value})
    }
    handleSubmitChange = e => {
        e.preventDefault();
        this.setState({newTech:"",techs:[...this.state.techs,this.state.newTech]})
    }
    handleDelete = tech => {
        this.setState({newTech:"",techs:this.state.techs.filter(val => val != tech)})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitChange}>
                <div>{this.state.newTech}</div>
                <ul>
                    { this.state.techs.map( val => <TechItem key={val} tech={val} onDelete={() => this.handleDelete(val)}/> )}
                </ul>
                <input type="text" onChange={this.handleInputChange}  value={this.state.newTech}/>
                <button type="submit" > Enviar </button>
            </form>
        )
    }
}

export default TechList
