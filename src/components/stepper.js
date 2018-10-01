import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AboutTeacherView from './aboutTeacherView.js';
import AboutCoursesView from './aboutCoursesView.js';
import Nidurstodur from './nidurstodurView.js';


class StepperProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };

  }



  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: (stepIndex + 1) % 3,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
 
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <AboutTeacherView/>
        )
      case 1:
        return (
          <AboutCoursesView/>
        )
      case 2:
        return (
          <Nidurstodur/>
        )
      default:
        return 'Kemst ekki';
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  componentWillMount() {
    
  }

  render() {
    const {stepIndex,onn} = this.state;
    const contentStyle = {margin: '0 16px'};
    
    return (
      <div style={{width: '100%', maxWidth: 1000, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel active={true}>Um kennara</StepLabel>
          </Step>
          <Step>
            <StepLabel>Um áfanga</StepLabel>
          </Step>
          <Step>
            <StepLabel>Niðurstöður</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
        <div>
              {this.getStepContent(stepIndex,onn)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Aftur"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12,marginTop: 10}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Enda' : 'Fram'}
                  backgroundColor={this.props.iconColor}
                  labelColor='#FFFFFF'
                  style={{marginTop: 10}}
                  onClick={this.handleNext}
                  disabled={this.state.stepIndex === 2}
                />
              </div>
            </div>
          
        </div>
      </div>
    );
  }
}

export default StepperProgress