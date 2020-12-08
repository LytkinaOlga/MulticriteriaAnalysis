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
            maxSum: 0,
            answer: "",
        }
        this.CriteriaTable = this.CriteriaTable.bind(this);
        this.generateCriteriaArray = this.generateCriteriaArray.bind(this);
        this.OptionTable = this.OptionTable.bind(this);
        this.generateOptionArray = this.generateOptionArray.bind(this);
        this.CriteriaPartInMainTable = this.CriteriaPartInMainTable.bind(this);
        this.generateMarkArrayOfArray = this.generateMarkArrayOfArray.bind(this);
        this.MarkTable = this.MarkTable.bind(this);
        this.MarkRow = this.MarkRow.bind(this);
        this.generateArrayOfSum = this.generateArrayOfSum.bind(this);
        this.ResultColumnOfSum = this.ResultColumnOfSum.bind(this);
    }

    render() {
        switch (this.state.stage) {
            case 1:
                return (
                    <div className="App" align="center">
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
                        <button class="btn btn-success" onClick={() => {
                            this.generateCriteriaArray();
                            this.generateMarkArrayOfArray();
                            this.generateArrayOfSum();
                        }}>Далее
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div align="center"> <h1>Заполните критерии</h1>
                        <table class="table table-hover">
                            <thead>
                            <td >Имя</td>
                            <td >Вес</td>
                            </thead>
                            <this.CriteriaTable/>
                        </table>

                        <button class="btn btn-success" onClick={
                            () => {
                                console.log(this.state.critters);
                                axios.post(serverUrl + "/", this.state.critters)
                                    .then(r => console.log("success"));

                                this.generateOptionArray();
                            }
                        }>
                            Далее
                        </button>
                    </div>
                )
            case 3:
                return (
                    <div align = "center">
                        Заполните варианты
                        <table class="table table-hover">
                            <thead>
                            <td>Имя</td>
                            </thead>
                            <this.OptionTable/>
                        </table>
                        <button class="btn btn-success" onClick={
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
                            Далее
                        </button>
                    </div>
                )
            case 4:
                return (
                    <div align = "center">
                        Проставьте оценки
                        <table class="table table-hover">
                            <tr><th></th><td><this.CriteriaPartInMainTable/></td><th>Сумма</th></tr>
                            <tr><td><this.OptionTable/></td><this.MarkTable/></tr>
                        </table>
                        <button class="btn btn-success" onClick={
                            () => {
                                console.log(this.state.markss);
                                axios.post(serverUrl + "/getMarks", this.state.markss)
                                    .then(r => console.log("success"));
                                axios.get(serverUrl + "/getSumOfMarks", this.state.arrayOfSum).then(r=>console.log(r.data))
                                axios.get(serverUrl + "/getMaxSum", this.state.maxSum).then(r => this.setState((state) => {
                                    state.maxSum = r.data;
                                    return state;
                                }))
                                axios.get(serverUrl + "/getAnswer", this.state.answer).then(r => this.setState((state) => {
                                    state.answer = r.data;
                                    return state;
                                }))
                                this.setState((state) => {
                                    state.stage = 5;
                                    return state;
                                })


                            }
                        }>
                            Рассчитать
                        </button>
                    </div>
                )
            case 5:
                return (
                    <div align="center">
                        Результат
                        <table class="table table-hover">
                            <tr><th></th><td><this.CriteriaPartInMainTable/></td><th>Сумма</th></tr>
                            <tr><td><this.OptionTable/></td><this.MarkTable/><td><this.ResultColumnOfSum/></td></tr>
                        </table>
                        Наибольшее значение: {this.state.maxSum}
                        <div>
                        Ответ: {this.state.answer}
                        </div>
                    </div>
                )

        }

    }
    generateArrayOfSum(){
        let arrayOfSum = [];
        for (let i = 0; i < this.state.optionAmount; i++) {
            arrayOfSum[i] = 0
        }
        this.setState((state) => {
            state.arrayOfSum = arrayOfSum;
            return state;
        })
    }


    generateCriteriaArray() {
        let critters = [];
        for (let i = 0; i < this.state.criteriaAmount; i++) {
            critters[i] = {
                name: "",
                weight: 0.0,
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
    ResultColumnOfSum(){
        return this.state.arrayOfSum.map(
            (sum, index) => {
                return (
                    <tr>
                        <td>{sum}</td>
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
