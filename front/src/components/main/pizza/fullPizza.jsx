import {FC} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {$api} from "../../../api/api";

const FullPizza = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {isSuccess, isLoading, data, refetch, error} = useQuery(
        [`get pizza by id`],
        () =>
            $api({
                url: `/pizzas/${id}`,
            }),
        {
            refetchOnWindowFocus: false,
        },
    )


    return (
        <div className="container">
            {isSuccess && isLoading === false ? (
                <div style={{display: 'flex'}}>
                    <img src={data.imageUrl} style={{maxWidth: '33rem', minWidth: '15rem'}}/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '50px',
                        marginLeft: '150px',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h2 style={{fontSize: "45px"}}>{data.title}</h2>
                            <h4 style={{marginTop: '15px', fontSize: '30px'}}>{data.price} руб.</h4>
                        </div>
                        <Link to="/" style={{marginTop: "50px", marginBottom: '150px'}}>
                            <button className="button button--outline button--add">
                                <span>Назад</span>
                            </button>
                        </Link>
                    </div>

                </div>
            ) : <p>Идет загрузка...</p>}

        </div>
    );
};

export default FullPizza;