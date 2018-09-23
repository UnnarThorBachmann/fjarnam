import React, {Component} from 'react';


import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {

  input: {
    paddingBottom: '2%',
    paddingRight: '5%',
    marginLeft: '30px',
    marginRight: 'auto',
    width: '20%'
  },
  container: {display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'flex-start', 
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '10px',
              width: '100%'
  },

};

const fjoldatolur = [];
for (let i=1; i <=200; i++) {
  fjoldatolur.push(i);
}



class CourseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fjoldiByrjun: 39,
      fjoldiMid: 39, 
      fjoldiLokaprof: 39
    }
  }

  change0 = (event, index, value) => this.setState({fjoldiByrjun: value});
  change1 = (event, index, value) => this.setState({fjoldiMid: value});
  change2 = (event, index, value) => this.setState({fjoldiLokaprof: value});

 
  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  componentWillMount() {
    this.setState();
  }


  render() {
    const {fjoldiByrjun, fjoldiMid, fjoldiLokaprof} = this.state;

    return (
      <div style={styles.containerOuter}>   
        <div style={styles.container}>
          <div style={styles.input}>
            <SelectField
              floatingLabelText="Nemendafjöldi í upphafi kennslu"
              floatingLabelStyle={{color: deepOrangeA400}}
              value={fjoldiByrjun}
              onChange={this.change0}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            { 
              fjoldatolur.map((item)=> item).map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
          <div style={styles.input}>
            <SelectField
              floatingLabelText={this.props.onn}
              floatingLabelStyle={{color: deepOrangeA400}}
              value={fjoldiMid}
              onChange={this.change1}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            { 
              fjoldatolur.map((item)=> item).map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
          <div style={styles.input}>
            <SelectField
              floatingLabelText="Nemendafjöldi í lokaprófi"
              floatingLabelStyle={{color: deepOrangeA400}}
              value={fjoldiLokaprof}
              onChange={this.change2}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            { 
              fjoldatolur.map((item)=> item).map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
          
        </div>
       
      </div>

    );
  }
}


export default CourseView