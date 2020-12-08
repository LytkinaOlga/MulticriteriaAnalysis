import './App.css';
import * as React from "react";
import axios from "axios"

const serverUrl = "http://localhost:8080";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            criteriaAmount: 0,
            optionAmount: 0,
            stage: 1,
            arrayOfSum: 0,
        }
        this.CriteriaTable = this.CriteriaTable.bind(this);
        this.generateCriteriaArray = this.generateCriteriaArray.bind(this);
        this.OptionTable = this.OptionTable.bind(this);
        this.generateOptionArray = this.generateOptionArray.bind(this);
        this.CriteriaPartInMainTable = this.CriteriaPartInMainTable.bind(this);
        this.generateMarkArrayOfArray = this.generateMarkArrayOfArray.bind(this);
        this.MarkTable = this.MarkTable.bind(this);
        this.MarkRow = this.MarkRow.bind(this);
    }

    render() {
        switch (this.state.stage) {
            case 1:
                return (
                    <div className="App">
                        <h3>Количество критериев</h3>
                        <div>
                            <input value={this.state.criteriaAmount} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.criteriaAmount = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </div>
                        <h3>Количество вариантов</h3>
                        <div>
                            <input value={this.state.optionAmount} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.optionAmount = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </div>
                        <button onClick={() => {
                            this.generateCriteriaArray();
                            this.generateMarkArrayOfArray();
                        }}>Ok
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div> Заполните критерии
                        <table>
                            <thead>
                            <td>Имя</td>
                            <td>Вес</td>
                            </thead>
                            <this.CriteriaTable/>
                        </table>

                        <button onClick={
                            () => {
                                console.log(this.state.critters);
                                axios.post(serverUrl + "/", this.state.critters)
                                    .then(r => console.log("success"));

                                this.generateOptionArray();
                            }
                        }>
                            Submit
                        </button>
                    </div>
                )
            case 3:
                return (
                    <div>
                        Заполните варианты
                        <table>
                            <thead>
                            <td>Имя</td>
                            </thead>
                            <this.OptionTable/>
                        </table>
                        <button onClick={
                            () => {
                                console.log(this.state.options);
                                axios.post(serverUrl + "/options", this.state.options)
                                    .then(r => console.log("success"));
                                this.setState((state) => {
                                    state.stage = 4;
                                    return state;
                                })
                            }
                        }>
                            Submit
                        </button>
                    </div>
                )
            case 4:
                return (
                    <div>
                        Проставьте оценки
                        <table >
                            <tr><th>Пустая ячейка</th><td><this.CriteriaPartInMainTable/></td><th>Сумма</th></tr>
                            <tr><td><this.OptionTable/></td><this.MarkTable/></tr>
                        </table>
                        <button onClick={
                            () => {
                                console.log(this.state.markss);
                                axios.post(serverUrl + "/getMarks", this.state.markss)
                                    .then(r => console.log("success"));
                                axios.get(serverUrl + "/getSumOfMarks", this.state.arrayOfSum)
                                    .then(r => console(r.data))
                            }
                        }>
                            Submit
                        </button>
                    </div>
                )

        }

    }


    generateCriteriaArray() {
        let critters = [];
        for (let i = 0; i < this.state.criteriaAmount; i++) {
            critters[i] = {
                name: "",
                weight: 0,
            }
        }

        this.setState((state) => {
            state.critters = critters;
            state.stage = 2;
            return state;
        })
    }
    generateOptionArray(){
        let options =[];
        for (let i = 0; i < this.state.optionAmount; i++) {
            options[i] = {
                name: "",
            }
        }
        this.setState((state) => {
            state.options = options;
            state.stage = 3;
            return state;
        })
    }

    generateMarkArrayOfArray(){
        let markss=[];
        for (let i = 0; i < this.state.optionAmount; i++) {
            markss[i] = [];
            for (let j = 0; j < this.state.criteriaAmount; j++) {
                markss[i][j] = 0;
            }
        }
        this.setState((state) => {
            state.markss = markss;
            return state;
        })
    }

    MarkTable(){
        console.log(this.state);
        return this.state.markss.map(
            (marks, index) => {
                return (<tr><this.MarkRow marks={marks} i={index}/></tr>)
            }
                )
    }

    MarkRow(props){
        return props.marks.map(
            (mark, index) => {
                return (
                        <td>
                            <input value={mark} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.markss[props.i][index] = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </td>

                )
            }
        )

    }
    CriteriaTable() {
        console.log(this.state);
        return this.state.critters.map(
            (criteria, index) => {
                return (
                    <tr>
                        <td>
                            <input value={criteria.name} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.critters[index].name = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </td>
                        <td>
                            <input value={criteria.weight} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.critters[index].weight = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </td>
                    </tr>
                )
            })
    }
    CriteriaPartInMainTable(){
        return this.state.critters.map(
            (criteria, index) => {
                return (
                    <td>
                        <tr>
                            <input value={criteria.name} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.critters[index].name = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </tr>
                        <tr>
                            <input value={criteria.weight} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.critters[index].weight = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </tr>
                    </td>
                )
            })

    }
    OptionTable(){
        return this.state.options.map(
            (option, index) => {
                return (
                    <tr>
                        <td>
                            <input value={option.name} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.options[index].name = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </td>
                    </tr>
                )
            })

    }

    createMainTable(){
        return this.state.critters.map(
            (criteria, index) => {
                return (
                    <tr>
                        <td>
                            <input value={criteria.name} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.critters[index].name = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </td>
                        <td>
                            <input value={criteria.weight} onChange={
                                (event) => {
                                    this.setState((state) => {
                                        state.critters[index].weight = event.target.value;
                                        return state;
                                    })
                                }
                            }/>
                        </td>
                    </tr>
                )
            })

    }


}

export default App;
