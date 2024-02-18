import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import classes from "./GuestPicker.module.scss";
import {addChild, removeChild} from "../../redux/features/bookingSlice.ts";
import {useRef, useState} from "react";
import {useOnClickOutside} from "../../hooks/useOnClickOutside.ts";
import Container from "./Container.tsx";

const getAgeText = (age: number) => {
    if (age === 0) {
        return "до 1 года";
    }
    if (age === 1) {
        return "1 год";
    }
    if (2 <= age && age <= 4) {
        return `${age} года`;
    }

    return `${age} лет`;
}

const AddedChildrenSection = () => {
    const {childrenAgeList} = useAppSelector(state => state.booking);
    const dispatch = useAppDispatch();

    return (
        <>
            {childrenAgeList.map((age: number, index: number) =>
                <div className={classes.child} key={Math.random()}>
                    <span>
                        {`Ребенок ${getAgeText(age)}`}
                    </span>
                    <button
                        className={classes.removeButton}
                        onClick={() => dispatch(removeChild(index))}
                    />
                </div>
            )}
        </>
    )
}

const AddChildList = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const agesArray = Array.from({length: 18}, (_v, k) => k);
    const dispatch = useAppDispatch();
    const ref = useRef(null);

    useOnClickOutside(ref, () => setIsOpen(false));

    return (
        <div className={[classes.childListContainer, isOpen ? classes.opened : ""].join(" ")} ref={ref}>
            <div
                className={classes.childListHeader}
                onClick={() => setIsOpen(true)}
            >
                <span>
                    {!isOpen ? "Добавить ребенка" : "Выберите возраст ребенка"}
                </span>
            </div>
            {isOpen &&
                <div className={classes.childAgesContainer}>
                    {agesArray.map((age: number) => (
                        <div
                            className={classes.childAgeField}
                            onClick={() => {
                                setIsOpen(false);
                                dispatch(addChild(age));
                            }}
                            key={age}
                        >
                            <span>{getAgeText(age)}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

const ChildrenSections = () => {
    return (
        <Container>
            <AddedChildrenSection/>
            <AddChildList/>
        </Container>
    );
};

export default ChildrenSections;