import * as React from "react";
import {GenderProps} from "../../models/propsDeclaration";
import {Input, Typography} from "@material-ui/core";
import GenderList from "./gender/GenderListComponent";
import {genderMockList2} from "../../data-mock/GenderMock";
import {GenderModel} from "../../models/genderModel";


interface State {
    genders: GenderModel[];
};

/**
 * Selection system for adding or removing gender from a certain list
 * @param props the list to modify
 * @constructor
 */
class GenderSelector extends React.Component<GenderProps, State> {
    state: State = {
        genders: this.props.genders
    };
    funAdd = (gender: GenderModel) => {
        if(!this.state.genders.includes(gender)) {
            this.state.genders.push(gender);

            this.setState({
                    genders: this.state.genders
                }
            );
        }
        console.log('porps gendders ', this.props.genders);
    };
    funRemove = (gender: GenderModel) => {
        this.state.genders.splice(this.state.genders.indexOf(gender),1);
        this.setState({
                genders: this.state.genders
            }
        );
        console.log('porps gendders ', this.props.genders);
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (<div>
            <Typography>
                Gender Selected
            </Typography>
            <GenderList genders={this.state.genders} ClickHandler={this.funRemove}/>
            <Typography>
                Gender Search <Input placeholder="Placeholder" inputProps={{'aria-label': 'description'}}/>
            </Typography>
            <GenderList genders={genderMockList2.filter(gender => !this.state.genders.includes(gender))} ClickHandler={this.funAdd}/>
        </div>);
    }


}

const GenderSelector2 = (props: GenderProps) => {
    const state = {
        genders: props.genders
    };
    const funAdd = (gender: GenderModel) => {

        state.genders.push(gender);

        console.log('pushed', state.genders)
    };


    return (<div>
        <Typography>
            Gender Selected
        </Typography>
        <GenderList genders={state.genders}/>
        <Typography>
            Gender Search <Input placeholder="Placeholder" inputProps={{'aria-label': 'description'}}/>
        </Typography>
        <GenderList genders={genderMockList2} ClickHandler={funAdd}/>
    </div>);
};

export default GenderSelector;