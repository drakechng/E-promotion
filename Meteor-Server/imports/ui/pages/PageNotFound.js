import React from 'react'
import SubNavBar from '../components/SubNavBar'
import NavLink from '../Layouts/NavLink'
export default React.createClass({
    render() {
        return <div  className="content-wrapper"  style={{minHeight : 997+"px"}}>

            <SubNavBar title = "Error"/>
                            <section className="content">
                    <div className="row">

                        <div className="error-page">
                            <h2 className="headline text-yellow"> 404</h2>

                            <div className="error-content">
                                <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>

                                <p>
                                    We could not find the page you were looking for.
                                    Meanwhile, you may <NavLink to="/">return to dashboard</NavLink> or try using the search form.
                                </p>


                            </div>
                        </div>
                    </div></section>
        </div>
    }
})
