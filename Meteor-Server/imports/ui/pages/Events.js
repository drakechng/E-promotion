import React from 'react'
import SubNavBar from '../components/SubNavBar'
export default React.createClass({
  render() {
    return <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
      <SubNavBar title = "Events"/>
      <section className="content">
        <div className="row">
          <ul>

            <form className="new-task" onSubmit={this.handleSubmit}>
              <table><tr>
                <td>Event Title:</td>
                <td><input
                    type="text"
                    placeholder=""
                /></td></tr>
                <tr><td>Event Description:</td>
                  <td><textarea
                      placeholder=""
                  /></td></tr>

                <tr><td>Date:</td>
                  <td><input
                      type="date"
                      placeholder=""
                  /></td> </tr>
                <tr><td></td>
                  <td><button type="submit">Submit</button></td>
                </tr>
              </table>
            </form>


          </ul>
           </div>
      </section>
      </div>
  }
})
