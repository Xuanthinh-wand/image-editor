import React from 'react';
import { Menu } from '../../constants/menu'
import { appAction } from '../../actions/app';
import _ from 'lodash';

export default function SitebarPage(props) {
    const { appStore, appChangeMenu, appToggleShow } = appAction()
    const defaultMenu = Menu.find(item => item.default);
    var menuActive = appStore.menu || defaultMenu;

    return (<React.Fragment>
        <div className="main-menu">
            <div className="logo-area">
                <img src="https://removal.ai/wp-content/uploads/rme/fasion.png"></img>
            </div>
            <div className="menu">
                {
                    Menu.map(item => {
                        return (<div key={item.key} className={menuActive.key == item.key && "menu-item active" || "menu-item"} onClick={() => appChangeMenu(item)}>
                            <i className={item.icon}></i>
                        </div>)
                    })
                }
            </div>
            <div className="bot-menu">
                <div className="bot-menu--item" onClick={() => appToggleShow()}>
                    <i className="fal fa-times-circle"></i>
                </div>
            </div>
        </div>
    </React.Fragment>)
}
