import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-beautify',
  template: `<pre>{{uglyJson | json}}</pre>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class BeautifyComponent implements OnInit {
  constructor() { }

  uglyJson :any = {
    'user name': 'john snow',
    'earn salary': 100.50,
    'user details': {
      'user age': 40,
      'user address': 'somewhere',
      'user phone': {
        'user phone cell': '8291123344',
        'user cell phone ': '88223233',
        'google phone': {
          'user phone cell': { 'test 1':{ 'phone number ':'8291123344'} }
        },
        'huawey phone': {
          'user phone cell': { 'test 1':'8291123344' }
        }
      }
    }
  };

  ngOnInit() {
    this.uglyJson = { ...this.transform(this.uglyJson,' ','_')};
  }

  transform(originalObj, simbolOrigin, simbolResult) {
    const propsValue = Object.keys(originalObj).map(key => originalObj[key]);
    const propsValueType = propsValue.map((prop) => typeof prop);
    let tempObject = {};
    Object.keys(originalObj)
      .map((prop, index) => {
        const newName = this.convert(prop,simbolOrigin,simbolResult);
        tempObject[newName] = propsValue[index];
        if(propsValueType[index] === 'object'){
          tempObject[newName] = this.transform(tempObject[newName],simbolOrigin, simbolResult);
          return prop;
        }
        return prop;
      });
    return tempObject;
  }

  convert(text,separator, newValue) {
    return text.split(separator).join(newValue);
  }



}
