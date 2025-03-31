
export function isItAdmin(req){         //
    let isAdmin=false;              //this Will change later
    if(req.user.type=="Admin"){     //If you are an admin
        isAdmin=true;
    }
    return isAdmin;
}


export function isItCustomer(req){         //
    let isCustomer=false;              //this Will change later
    if(req.user.type=="Customer"){     //If you are an customer
        isCustomer=true;
    }
    return isCustomer;
}