import BackgroundControlPage from '../components/background/control'
import ColorControlPage from '../components/background/color-control'
import TemplateControlPage from '../components/template/control'
import ImageControlPage from '../components/image/control'
import TextControlPage from '../components/text/control'
// import ShapeControlPage from '../components/shape/control'

export const Menu = [
    {
        key: "template",
        name: "Tempalate",
        icon: "fal fa-th-large",
        default: false,
        text: 'Sizes',
        component: TemplateControlPage
    },
    {
        key: "image",
        name: "Image",
        icon: "fal fa-image-polaroid",
        default: true,
        text: 'Photos',
        component: ImageControlPage
    },
    {
        key: "text",
        name: "Text",
        icon: "fal fa-text",
        default: false,
        text: 'Text',
        component: TextControlPage
    },
    {
        key: "background",
        name: "Background",
        icon: "fal fa-chess-board",
        default: false,
        text: 'Background Image',
        component: BackgroundControlPage
    },
    {
        key: "background-color",
        name: "Background",
        icon: "fal fa-adjust",
        default: false,
        text: 'Background Color',
        component: ColorControlPage
    }
    // {
    //     key: "shape",
    //     name: "Shape",
    //     icon: "fal fa-shapes",
    //     default: false,
    //     component: ShapeControlPage
    // }
];
