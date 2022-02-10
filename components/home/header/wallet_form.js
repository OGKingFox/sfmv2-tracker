import { Form, FormControl } from "react-bootstrap";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useEffect, useState } from "react";

export default function WalletForm({...props}) {

    const options = [];

    if (props.tokens) {
        props.tokens.forEach((token, index) => {
            options.push(
                <option value={token.symbol.toLowerCase()} key={index}>
                    {token.symbol}
                </option>
            );
        });
    }

    useEffect(() => {
        if (!props.tokens) {
            return;
        }

        let form     = document.getElementById("searchForm");
        let field    = document.getElementById("walletAddr");
        let alert    = document.getElementById("walletAlert");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let data = new FormData(form);

            let tokenid = data.get("tokenId");
            let wallet  = data.get("wallet");
            let parts   = wallet.split("x");

            if (parts.length != 2 
                || parts[0] != "0" 
                || parts[1].length != "40") {
                    alert.classList.remove("d-none");
                return;
            }

            alert.classList.add("d-none");
            field.disabled = true;

            let found = false;

            for (let token of props.tokens) {
                if (token.symbol.toLowerCase() == tokenid.toLowerCase()) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                field.disabled = false;
                return;
            }
            
            window.location = "/"+tokenid+"/"+wallet;
            field.disabled = false;
        });
    }, [props.tokens]);

    return(
        <Form id="searchForm">
            <div className="d-flex">
                <div className="w-100">
                    <div className="custom-group">
                        <div className="walletAlert d-none" id="walletAlert">
                            <Tippy content="Invalid address format" placement="bottom">
                                <i className="far fa-exclamation-triangle text-danger"/>
                            </Tippy>
                        </div>
                        <FormControl 
                            name="wallet" 
                            id="walletAddr" 
                            placeholder="Type a wallet address"
                            className="ps-4"/>
                        <div className="gametype">
                            <Form.Select 
                                    id="tokenSelect"
                                    name="tokenId"
                                    aria-label="Default select example" 
                                    size="sm" 
                                    className="border-0 token-select shadow-none">
                                {options}
                            </Form.Select>
                        </div>
                    </div>
                </div>
                <div className="text-nowrap ps-2">
                    <button type="submit" className="btn btn-primary shadow-0">
                        Go <i className="fat fa-arrow-right fa-fw"></i>
                    </button>
                </div>
            </div>
        </Form>
    )
}