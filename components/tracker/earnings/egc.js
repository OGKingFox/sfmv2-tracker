import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import FontIcon from "../../global/fonticon";
import * as Functions from "/functions";

export default function EgcEarnings({...props}) {

    const [earned, setEarned] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(async() => {
        if (!props.data) {
            return;
        }

        let distributor = "0xfbab1d829e36efbd13642229eae2964004f38c41";
        let total = 0;

        for (let txn of props.data.txnList) {
            if (txn.from != distributor) {
                continue;
            }

            let value = (txn.value / 10 ** txn.tokenDecimal);
            total += value;
        }

        setEarned(total);
        setLoaded(true);
    }, [props.data]);

    let icon = <FontIcon icon="spinner" type="fad" pulse={true}/>;

    return (
        <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
                <p className="small-text text-muted mb-1">
                    Earnings (BUSD)
                </p>
                <p className="mb-0 fw-bold">
                    {!loaded ? icon : Functions.formatNumber(earned, 5)} 
                </p>
            </Card.Body>
        </Card>
    )
}