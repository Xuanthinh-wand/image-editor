import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import { formatColor } from '../lib/colorHelper';
import classNames from 'classnames';
import reactCSS from 'reactcss'

export default function ColorPicker(props) {

    const [displayColorPicker, setDisplayColorPicker] = useState(props.show);
    const [color, setColor] = useState(props.color || {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
    });
    const [value, setValue] = useState(props.value || '#000');

    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    function open() {
        setDisplayColorPicker(true);
    };

    function close() {
        setDisplayColorPicker(false);
    };

    function handleChange(color) {
        setColor(color.rgb);
        setValue(formatColor(color.rgb));
        if (props.onChange) {
            props.onChange(formatColor(color.rgb));
        }
    };

    const { className, onChange, show, showPicker, showText = false, ...inputProps } = props;

    const classes = classNames(
        'color-picker',
        className,
    )

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'relative',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });


    return (
        <div className={classes}>
            <div className="color-picker--control">
                <div className="color-picker--icon" onClick={() => setDisplayColorPicker(!displayColorPicker)}>
                    <div className="pointer color-picker--color"
                        style={{ backgroundColor: value, height: "100%" }}></div>
                </div>
                {
                    showText && <span>{showText}</span>
                }
            </div>
            {
                displayColorPicker && (
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={close} />
                        <SketchPicker color={color} onChange={handleChange} />
                    </div>
                )
            }
        </div>

    )
}
