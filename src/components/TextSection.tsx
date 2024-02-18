import {FC} from 'react';
import {ITextData} from "../textSections.tsx";

interface ITextSection {
    data: ITextData;
    id?: string;
}

const TextSection: FC<ITextSection> = ({data, id}) => {
    return (
        <div className="text-section section" id={id}>
            <div className="block-container heading-container">
                <h1 className="heading">
                    {data.heading}
                </h1>
            </div>
            <div className="block-container description-container">
                <p>
                    {data.description}
                </p>
            </div>
        </div>
    );
};

export default TextSection;