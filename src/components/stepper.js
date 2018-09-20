import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
//import Media from 'react-media';
//import Rusl from 'material-ui/svg-icons/action/delete';
//import Vista from 'material-ui/svg-icons/content/create';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AboutTeacherView from './aboutTeacherView.js';
//import CoursesFormView from './coursesFormView.js';
//import Nidurstodur from './nidurstodur.js';
//import NidurstodurSundurlidun from './nidurstodurSundurlidun.js';
//import NidurstodurSundurlidunMobile from './nidurstodurSundurlidunMobile.js';

//import Endurtaka from 'material-ui/svg-icons/action/autorenew';
import IconButton from 'material-ui/IconButton';

//import {connect} from 'react-redux';

class StepperProgress extends React.Component {

  state = {
    stepIndex: 0,
    afram: true
  };


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
          <div>
            <p>Um áfanga</p>
          </div>
        )
      case 2:
        return (
          <div>
           <p>Niðurstöður</p>
          </div>
        )
      default:
        return 'Kemst ekki';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
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
              {this.getStepContent(stepIndex)}
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

const mapStateToProps = (state)=>({
  storeState: {...state}
});

//export default connect(mapStateToProps)(StepperProgress);
export default StepperProgress