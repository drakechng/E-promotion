import React,{Component} from  'react'

export default class SubNavBar extends Component {

    render(){
        return(
            <section className="content-header">
                <h1>
                    {this.props.title}

                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="#">Forms</a></li>
                    <li className="active">General Elements</li>
                </ol>
            </section>

        )
    }


}