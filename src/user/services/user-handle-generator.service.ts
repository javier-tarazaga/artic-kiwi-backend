import { Injectable } from '@nestjs/common';

@Injectable()
export class UserHandleGeneratorService {
  generateRandomHandle(): string {
    const funnyWords = [
      'banana',
      'pickle',
      'giraffe',
      'silly',
      'chicken',
      'clown',
      'noodle',
      'giggles',
      'bubbles',
      'wombat',
      'flamingo',
    ];

    const commonWords: string[] = [
      'red',
      'blue',
      'green',
      'yellow',
      'orange',
      'purple',
      'pink',
      'brown',
      'gray',
      'black',
      'white',
      'cyan',
      'magenta',
      'lime',
      'teal',
      'indigo',
      'violet',
      'olive',
      'maroon',
      'navy',
      'salmon',
      'turquoise',
      'gold',
      'silver',
      'plum',
      'sienna',
      'thistle',
      'peru',
      'orchid',
      'slategray',
      'dodgerblue',
      'royalblue',
      'cadetblue',
      'chocolate',
      'darkgoldenrod',
      'forestgreen',
      'deeppink',
      'indianred',
      'slateblue',
      'mediumseagreen',
      'steelblue',
      'darkorange',
      // Add more colors here as needed...
    ];

    // Generate a random index for the funny word
    const randomFunnyWordIndex = Math.floor(Math.random() * funnyWords.length);

    // Generate a random index for the commond word
    const randomCommonWordIndex = Math.floor(
      Math.random() * commonWords.length,
    );

    // Generate a random 3-digit number
    const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;

    // Generate the handle by concatenating the three parts
    const firstWord = commonWords[randomCommonWordIndex];
    const funnyWord = funnyWords[randomFunnyWordIndex];
    const numberPart = randomThreeDigitNumber.toString();

    const handle = `${firstWord}-${funnyWord}-${numberPart}`;

    return handle;
  }
}
