import React, {Component, PropTypes} from 'react';

import NavLink from './NavLink'

export default class AsideBar extends Component {
   render(){
return(
      <aside className="main-sidebar">
         <section className="sidebar">
            <div className="user-panel">
               <div className="pull-left image">
                  <img src="/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
               </div>
               <div className="pull-left info">
                  <p>Alexander Pierce</p>
                  <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
               </div>
            </div>
            <form action="#" method="get" className="sidebar-form">
               <div className="input-group">
                  <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
               </div>
            </form>
            <ul className="sidebar-menu">
                <li className="header">MAIN NAVIGATION</li>

                  <li>
                      <NavLink to="/">
                        <i className="fa fa-dashboard"></i> <span>Overview</span></NavLink></li>

                  <li className="treeview">
                     <a href="#">
                        <i className="fa fa-plus"></i> <span>Create</span>
                        <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
                     </a>
                     <ul className="treeview-menu">
                         <li> <NavLink to="/vouchers">  <i className="fa fa-circle-o"></i>Voucher</NavLink></li>
                         <li> <NavLink to="/estamps">  <i className="fa fa-circle-o"></i>E-Stamp System</NavLink></li>


                     </ul>
                  </li>

                <li className="treeview">
                    <a href="#">
                        <i className="fa fa-gear"></i> <span>Manage</span>
                        <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
                    </a>
                    <ul className="treeview-menu">
                        <li> <NavLink to="/manage-vouchers">  <i className="fa fa-circle-o"></i>Vouchers</NavLink></li>
                        <li> <NavLink to="/manage-estamps">  <i className="fa fa-circle-o"></i>E-Stamps</NavLink></li>
                        <li> <NavLink to="/members">  <i className="fa fa-circle-o"></i>Members</NavLink></li>
                        <li> <NavLink to="/addmember">  <i className="fa fa-circle-o"></i>All Customers</NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/events">
                        <i className="fa fa-sticky-note-o"></i> <span>Events</span></NavLink></li>

                  <li>
                     <a href="pages/calendar.html">
                        <i className="fa fa-calendar"></i> <span>Calendar</span>
                        <span className="pull-right-container">
              <small className="label pull-right bg-red">3</small>
              <small className="label pull-right bg-blue">17</small>
            </span>
                     </a>
                  </li>
                  <li>
                     <a href="pages/mailbox/mailbox.html">
                        <i className="fa fa-envelope"></i> <span>Mailbox</span>
                        <span className="pull-right-container">
              <small className="label pull-right bg-yellow">12</small>
              <small className="label pull-right bg-green">16</small>
              <small className="label pull-right bg-red">5</small>
            </span>
                     </a>
                  </li></ul>


         </section>
      </aside>)


   }

}