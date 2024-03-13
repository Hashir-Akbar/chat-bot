import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RangeSlider from './RangeSlider';
import Iframe from './Iframe';

// Custom component for asking date and time
class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedTime: null,
      dateAndTimeSelected: false, // Flag to track if both date and time are selected
    };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date }, this.checkDateTimeSelection);
  };

  handleTimeChange = time => {
    this.setState({ selectedTime: time }, this.checkDateTimeSelection);
  };

  // Check if both date and time are selected
  checkDateTimeSelection = () => {
    const { selectedDate, selectedTime } = this.state;
    if (selectedDate && selectedTime) {
      this.setState({ dateAndTimeSelected: true });
      this.props.triggerNextStep({ value: { date: selectedDate, time: selectedTime } });
    }
  };

  render() {
    return (
      <div>
        <h4>Please select a date and time:</h4>
        <DatePicker
          selected={this.state.selectedDate}
          onChange={this.handleDateChange}
          dateFormat="MMMM d, yyyy"
          selectsStart
          startDate={this.state.selectedDate}
          endDate={this.state.selectedDate}
          placeholderText="Select Date"
          minDate={new Date()}
        />
        <DatePicker
          selected={this.state.selectedTime}
          onChange={this.handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          placeholderText="Select Time"
        />
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  triggerNextStep: PropTypes.func,
};

// Chatbot component

class ChatbotForm extends Component {

  chatbotTriggered = () => {
    this.refs.chatbot.triggerNextStep();
  };
  
      
  render() {


    return (
      <ChatBot
        ref="chatbot"
        steps={[
          {
            id: '1',
            message: 'Hello! What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '2',
          },
          {
            id: '2',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '5' },
              { value: 'female', label: 'Female', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: 'dateAndTime',
            waitAction: true,
          },
          {
            id: 'dateAndTime',
            message: 'Choose date and time for the appointment',
            trigger: 'datetime',
            waitAction: true,
          },
          {
            id: 'datetime',
            component: <DateTimePicker />,
            waitAction: true,
            trigger: 'iframe',
          },
          
          {
            id: 'iframe',
            message: 'Here is the location',
            trigger: 'iframeItem',
    
          },
          {
            id: 'iframeItem',
            component: <Iframe />,
           
            trigger: 'thanks',
          },
          {
            id: 'thanks',
            options: [
              { value: 'I will visit', label: 'I will Visit', trigger: 'range' },
              { value: 'Got your location', label: 'You are too far', trigger: 'range' },
            ],
          },
          {
            id: 'range',
            message: 'Please select range',
            trigger: 'rangeItem',
            waitAction: true,
          },
          {
            id: 'rangeItem',
            component: <RangeSlider clickFunc={this.chatbotTriggered}/>,
            waitAction: true,
            trigger: 'end',
          },
          {
            id: 'end',
            message: 'Thank you! Your form has been submitted.',
            end: true,
          },
        ]}
      />
    );
  }
}



export default ChatbotForm;