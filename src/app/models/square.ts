export class Square{        
    value: string;
    isHighlighted: boolean;
    isChoosed: boolean;
    owner: string;
    constructor(value, isHighlighted,isChoosed,owner){
        this.value=value;
        this.isHighlighted= isHighlighted;
        this.isChoosed = isChoosed;
        this.owner = owner;
    }
}

