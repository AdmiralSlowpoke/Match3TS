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
    @property(cc.Integer)
    Width=8;
    @property(cc.Integer)
    Height=7;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.GenerateLayout();
    }
    GenerateLayout(){
        let field:number[][]=[];
        //Генерируем числовое поле 7x8
        for(let i=0;i<this.Height+4;i++){
            field[i]=[];
            for(let j=0;j<this.Width+4;j++){
                if(i<2||j<2||i>this.Height+1||j>this.Width+1)
                field[i][j]=9;
                else
                field[i][j]=RandomInt(0,4);
            }
        }
        
        //Пока что без проверки на начальные комбинации
        //Потом не допускать чтобы в ряду и строке было более двух одинаковых чисел
        //А так же более 3 одинаковых элементов в одном квадрате 2 на 2
        let BlockWidth:number=this.GridLayout.width/this.Width;
        let BlockHeight:number=this.GridLayout.height/this.Height;
        for(let i=2;i<this.Height+2;i++){
            for(let j=2;j<this.Width+2;j++){
                //Горизонтальная проверка
                if(field[i][j]==field[i][j+1]&&field[i][j]==field[i][j+2])
                    field[i][j+2]=RandomExcept([field[i-1][j+2],field[i][j]]);
                //Вертикальная проверка
                if(field[i][j]==field[i+1][j]&&field[i][j]==field[i+2][j])
                    field[i+2][j]=RandomExcept([field[i+2][j-1],field[i][j]]);
                //Проверка квадратом
                if(field[i][j]==field[i+1][j]&&field[i][j]==field[i][j+1]&&field[i][j]==field[i+1][j+1])
                    field[i+1][j+1]=RandomExcept([field[i][j],field[i+1][j+2]]);

                let node=cc.instantiate(this.BlankCube);
                node.height=BlockHeight;
                node.width=BlockWidth;
                node.getComponent(cc.Sprite).spriteFrame=this.Cubes[field[i][j]];
                node.parent=this.GridLayout;
                node.setPosition(cc.v2(-this.Width+(BlockWidth*j)-(BlockWidth*2),-this.Height+(BlockHeight*i)-(BlockHeight*2)));
                cc.log(node.position.x+" "+node.position.y);
            }
        }
        //this.GridLayout.getComponent(cc.Layout).active;   
}

}
function RandomExcept(mas:number[]){
    let a;
    let check;
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
