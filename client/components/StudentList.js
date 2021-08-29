import React from 'react';
import {fetchStudents, deleteStudent} from '../redux/store';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class StudentList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStudents();
  }

  render() {
    console.log('thislistprops', this.props)
    return (
      <ul>
        {this.props.students.map((student) => (
          <li key={student.id}>
            <div>
              <p>Name: {student.fullName}</p>
              <p>Email: {student.email}</p>
              <Link to={`/students/${student.id}`}>View Detail</Link>
              <button 
                onClick = {()=> this.props.toDeleteStudent(student.id)}
               >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    )

  }
}

const mapStateToProps = (state) => ({
  students: state.students
});

const mapDispatchToProps = (dispatch, {history}) => ({
  loadStudents: () => dispatch(fetchStudents()),
  toDeleteStudent: (id)=>dispatch(deleteStudent(id, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
