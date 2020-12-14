export default {
  getElementsByName: () => {
    return [{
      name: 'test-name',
      type: 'checkbox',
      checked: true,
      getAttribute: () => {
        return "required,mustBeTrue"
      }
    }]
  },
  getElementsByClassName: () => {
    return [{
      offsetTop: 200 
    }]
  },
  getElementsByTagName: () => {
    return [{
      name: 'description',
      length:1,
      content:''
    }]
  },
  querySelectorAll: () => {
    return [{
      name: 'test-name',
      type: 'checkbox',
      checked: true,
      id: 'testId',
      getAttribute: () => {
        return "required,mustBeTrue"
      }
    }]
  },
  getElementById: () => {
    return {
      getAttribute: () => {
        return "required, mustBeOver18"
      },
      value: 12
    }
  }
};