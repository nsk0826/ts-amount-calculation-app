import React from 'react';
import './App.css';

type FeeClassification = {
  name: string;
  description: string;
  unitPrice: number;
  numOfPeople: number;
  totalPrice: number;
}

type DetailProps = {
  classification: FeeClassification;
  onNumOfPeopleChange: (num: number) => void;
}

type DetailState = {
  numOfPeople: number;
}

class Detail extends React.Component<DetailProps, DetailState> {

  constructor(props: DetailProps){
    super(props);
    this.state = {
      numOfPeople: props.classification.numOfPeople,
    }
  }

  onNUmOfPeopleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const num : number = Number(e.target.value);
    this.props.onNumOfPeopleChange(num);
  }


  render() {
    return (
      <div >
        <div className="classification-name">{this.props.classification.name}</div>
        <div className="description">{this.props.classification.description}</div>
        <div className="unit-price">{this.props.classification.unitPrice}円</div>
        <div className="num-people">
          <select value={this.props.classification.numOfPeople}
            onChange={e => this.onNUmOfPeopleChange(e)}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <span>名</span>
        </div>
      </div>
    );
  }
}

class Summary extends React.Component {

  type SummmaryProps = {
    numOfPeople: number;
    totalAmount: number;
  };
  render() {
    return (
      <div>
        <div className="party">
          <input type="text" className="party" value={this.props.numOfPeople} />
          <span>名様</span>
        </div>
        <div className="total-amount">
          <span>合計</span>
          <input type="text" className="total-amount" value="0" />
          <span>円</span>
        </div>
      </div>
    );
  }
}

type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
}

class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
  constructor(props: {}){
    super(props);
    const adults: FeeClassification = {
      name: "大人",
      description: "",
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0
    };
    const students: FeeClassification = {
      name: "学生",
      description: "中学・高校生",
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0
    };
    const children: FeeClassification = {
      name: "子ども",
      description: "小学生",
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0
    };
    const infants: FeeClassification = {
      name: "幼児",
      description: "未就学",
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0
    };
    this.state = { feeClassifications: [adults, students, children, infants]};
  }

  handleNumOfPeopleChange(idx: number, num: number){
    const currentFC = this.state.feeClassifications[idx];
    const newTotalPrice = currentFC.unitPrice * num;

    const newFC: FeeClassification = 
      Object.assign({}, currentFC, { numOfPeople: num, totalPrice: newTotalPrice});

    const feeClassifications = this.state.feeClassifications.slice();
    feeClassifications[idx] = newFC;

    this.setState({ feeClassifications: feeClassifications });
  }

  render() {
    const details = this.state.feeClassifications.map((fc, idx) => {
      return (
        <Detail key={idx.toString()} classification={fc}
          onNumOfPeopleChange={n => this.handleNumOfPeopleChange(idx, n)}/>
      );
    });

    const numOfPeople = this.state.feeClassifications
      .map(fc => fc.numOfPeople).reduce((p, c) => p + c);
    const totalAmount = this.state.feeClassifications
      .map(fc => fc.totalPrice).reduce((p, c) => p + c);
    
    return (
      <>
        {details}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount}/>
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
}

export default App;