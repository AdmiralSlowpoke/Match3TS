// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {

    @property(cc.Node)
    GridLayout: cc.Node;
    @property([cc.SpriteFrame])
    Cubes: cc.SpriteFrame[]=[];
    @property(cc.Prefab)
    BlankCube: cc.Prefab;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.GenerateLayout();
    }
    GenerateLayout(){
        let field:number[][]=[];
        //Генерируем числовое поле
        for(let i=0;i<9;i++){
            field[i]=[];
            for(let j=0;j<10;j++){
                if(i==0||j==0||i==8||j==9)
                field[i][j]=9;
                else
                field[i][j]=RandomInt(0,4);
            }
        }
        //Пока что без проверки на начальные комбинации
        //Потом не допускать чтобы в ряду и строке было более двух одинаковых чисел
        //А так же более 3 одинаковых элементов в одном квадрате 2 на 2


        //Горизонтальная проверка
        for(let i=1;i<8;i++){
            for(let j=1;j<7;j++){
                if(field[i][j]==field[i][j+1]&&field[i][j]==field[i][j+2])
                field[i][j+2]=RandomExcept([field[i][j+2],field[i+1][j+2],field[i-1][j+2],field[i][j+3]]);
                //cc.log(field[i][j]+" "+field[i][j+1]+" "+field[i][j+2]);
            }
        }
        //Вертикальная проверка
        for(let i=1;i<6;i++){
            for(let j=1;j<9;j++){
                if(field[i][j]==field[i+1][j]||field[i][j]==field[i+2][j])
                field[i+2][j]=RandomExcept([field[i+2][j],field[i+2][j+1],field[i+2][j-1],field[i+3][j]]);
            }
        }
        for(let i=1;i<8;i++){
            cc.log(field[i]);
            for(let j=1;j<9;j++){
                let node=cc.instantiate(this.BlankCube);
                node.getComponent(cc.Sprite).spriteFrame=this.Cubes[field[i][j]];
                node.parent=this.GridLayout;
            }
        }
        
}

}
function RandomExcept(mas:number[]){
    let a;
    let check;
    cc.log("TEST");
    for(;;){
        a=RandomInt(0,4);
        check=false;
        for(let i=0;i<mas.length;i++){
            if(a==mas[i])
            check=true;
        }
        if(check==false){
            break; 
        }
    }
    return a;
}
function RandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
