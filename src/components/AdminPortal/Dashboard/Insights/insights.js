import '../Insights/insights.css';
import { ReactComponent as Bullet } from "../../../../Assets/bullet.svg"
import { ReactComponent as SearchIcon } from '../../../../Assets/search.svg';
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Insights(props) {
    const [searchFilterValue, setSearchFilterValue] = useState("");
    const [originalTests, setOriginalTests] = useState(props.data);
    const [isLoading, setIsLoading] = useState(true);
    const handleFiltersChange = () => {
        const getFilterItems = (items, searchValue) => {
            if (searchValue) {
                let fitlerData = items.filter((item) =>
                    item.techName?.toLowerCase().includes(searchValue.toLowerCase())
                );
                return fitlerData;
            }
            return items;
        };
        const filters = getFilterItems(props.data, searchFilterValue);
        setOriginalTests(filters);
    }
    useEffect(() => {
        handleFiltersChange();
    }, [searchFilterValue])

    function renderInsights(insights) {
        return (
            <div className='div-insights'>
                <div className='row'>
                    <div className='col image-div'>
                        <img src={insights.techLink} alt='Description of the image' />
                    </div>
                    <div className='col'>
                        <div className='exam-name'>{insights.techName}</div>
                        <div className='number-of-test'>
                            {insights.beginner} Beginner <Bullet /> {insights.intermediate} Intermediate <Bullet /> {insights.advanced} Advanced
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        ///need to change rem one 
        <div style={{ maxHeight: "46rem", overflowY: "scroll" }}>
            <div className='about-insight col'>Insights</div>
            <div className=' insights' style={{ maxHeight: "90vh", overflowY: "scroll" }}>
                <div>
                    <input
                        className="search-insights"
                        type="text"
                        value={searchFilterValue}
                        placeholder="Search"
                        onChange={(event) => {
                            event.preventDefault();
                            setSearchFilterValue(event.target.value)
                        }}
                    />
                </div>
                {originalTests?.length === 0 ? (
                    props.data?.map((insights) => renderInsights(insights))
                ) : (
                    originalTests?.map((insights) => renderInsights(insights))
                )}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
                {renderInsights(props.data)}
            </div>
        </div>
    )
}

