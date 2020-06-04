import 'jquery';
import { GameController } from './Site/PlayGame/Controller/GameController';


if($('.top-level-game-index').length > 0)
{
    new GameController();
}

