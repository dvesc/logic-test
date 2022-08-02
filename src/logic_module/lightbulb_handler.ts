/**
 * @module app
 * @author David Escalante <davideeangarita@gmail.com>
 */

import { back_to_menu } from './files_handler';

const VOID_BOX = '⬜',
  lit_BOX = '🔸',
  WALL = '🧱',
  LIGHTBULB = '💡';
let table = [];

/**
 * Start the process, it will look for a {@link VOID_BOX void box} in the array
 * change its value to {@link lit_BOX lit box}
 * @param constructed_table 'Is optional' as it will only be used in the first iteration after the table is created
 */
export const init_process_step_one = (constructed_table?: string[]): void => {
  //when the table has been created we assign that value to our local variable
  if (constructed_table) table = constructed_table;

  let first_lightbulb_flag = 0,
    ligthbulb_coords: number[];

  for (let row = 0; row < table.length; row++) {
    if (first_lightbulb_flag == 0) {
      for (let colunm = 0; colunm < table[row].length; colunm++) {
        //first void box it finds will be illuminated
        if (table[row][colunm] == VOID_BOX) {
          table[row][colunm] = lit_BOX;
          //and look for another void one around it to put the lightbulb
          ligthbulb_coords = init_process_step_two(row, colunm);
          first_lightbulb_flag = 1;
          break;
        }
      }
    }
  }
  if (first_lightbulb_flag == 1) determine_next_ligthbulb(ligthbulb_coords, 1);
  else {
    view_table();
    count_lightbulbs();
  }
};

/**
 * Will search clockwise around the given coordinates for a {@link VOID_BOX void box} to put
 * the first {@link LIGHTBULB lightbulb}
 * @param lit_row The initial {@link lit_BOX lit box} row set by {@link init_process_step_one()}
 * @param lit_column The initial lit box column set by {@link init_process_step_one()}
 * @returns the coordinates of the first lightbulb
 */
const init_process_step_two = (
  lit_row: number,
  lit_column: number,
): number[] => {
  let lightbulb_coords: number[] = [lit_row, lit_column],
    found_flag = false;

  //one box to the right
  if (lit_column + 1 < table[lit_row].length && found_flag == false) {
    if (table[lit_row][lit_column + 1] == VOID_BOX) {
      lightbulb_coords = [lit_row, lit_column + 1];
      found_flag = true;
    }
  }
  //one square down
  if (lit_row + 1 < table.length && found_flag == false) {
    if (table[lit_row + 1][lit_column] == VOID_BOX) {
      lightbulb_coords = [lit_row + 1, lit_column];
      found_flag = true;
    }
  }
  //to put lightbulb
  table[lightbulb_coords[0]][lightbulb_coords[1]] = LIGHTBULB;
  turn_lights_on_or_off(lightbulb_coords, true);

  return lightbulb_coords;
};

/**
 * It moves through the {@link lit_BOX lit boxes} belonging to the coordinates of a
 * given {@link LIGHTBULB lightbulb} calling {@link seach_void_boxes()} to obtain the
 * position of a new lightbulb, in case this is the same position as the
 * previous lightbulb, it means that the displacement path must be changed,
 * so start the process again with {@link init_process_step_one()}
 * @param  previous_ligthbulb_coords Coordinates of the  lightbulb previously placed
 * @param step It can be `1` or `2`. The process to determine new bulbs is done by alternating two steps, this value becomes important in {@link seach_void_boxes()}
 */
const determine_next_ligthbulb = (
  previous_ligthbulb_coords: number[],
  step: number,
): void => {
  const LIGHTBULB_COLUMN = previous_ligthbulb_coords[1],
    LIGHTBULB_ROW = previous_ligthbulb_coords[0];
  let information: any = {
    lightbulb_coords: [[-1]],
    movement: false,
    next_step: 2,
  };

  //up
  for (let row = LIGHTBULB_ROW; row >= 0; row--) {
    const COORDS = [row, LIGHTBULB_COLUMN];
    if (table[COORDS[0]][COORDS[1]] == WALL) break;
    if (information.movement == true) break;
    information = seach_void_boxes(COORDS, previous_ligthbulb_coords, step);
  }
  //right
  for (
    let column = LIGHTBULB_COLUMN;
    column < table[LIGHTBULB_ROW].length;
    column++
  ) {
    const COORDS = [LIGHTBULB_ROW, column];
    if (information.movement == true) break;
    if (table[COORDS[0]][COORDS[1]] == WALL) break;
    information = seach_void_boxes(COORDS, previous_ligthbulb_coords, step);
  }
  //down
  for (let row = LIGHTBULB_ROW; row < table.length; row++) {
    const COORDS = [row, LIGHTBULB_COLUMN];
    if (table[COORDS[0]][COORDS[1]] == WALL) break;
    if (information.movement == true) break;
    information = seach_void_boxes(COORDS, previous_ligthbulb_coords, step);
  }
  //left
  for (let column = LIGHTBULB_COLUMN; column >= 0; column--) {
    const COORDS = [LIGHTBULB_ROW, column];
    if (table[COORDS[0]][COORDS[1]] == WALL) break;
    if (information.movement == true) break;
    information = seach_void_boxes(COORDS, previous_ligthbulb_coords, step);
  }
  //If the position of the next lightbulb is the same as the previous one, it means that
  //the process must be started from another blank box within the array
  if (
    information.lightbulb_coords[0] != LIGHTBULB_ROW ||
    information.lightbulb_coords[1] != LIGHTBULB_COLUMN
  ) {
    determine_next_ligthbulb(
      information.lightbulb_coords,
      information.next_step,
    );
  } else init_process_step_one();
};

/**
 * will search in clockwise around the coordinates by a {@link VOID_BOX  void box}, however it will
 * depend on the step indicated (1 or 2)
 *`step = 1`: The {@link LIGHTBULB lightbulb} will be moved to the {@link lit_BOX lit box} next to the void box found.
 *`step = 2`: A new lightbulb will be placed in the  void box found
 * @param lit_box_coords lit box coordinates reference to find void boxes around
 * @param old_lightbulb_coords Coordinates of the lightbulb previously played
 * @param step It can be `1` or `2`.
 * @returns An object with information about the next move in the process
 */
const seach_void_boxes = (
  lit_box_coords: number[],
  old_lightbulb_coords: number[],
  step: number,
): object => {
  const lit_row: number = lit_box_coords[0],
    lit_column: number = lit_box_coords[1];
  let new_lightbulb_coords: number[] = old_lightbulb_coords,
    movement_flag = false;

  //up
  if (lit_row - 1 != -1 && movement_flag == false) {
    if (table[lit_row - 1][lit_column] == VOID_BOX) {
      new_lightbulb_coords =
        step == 1 ? lit_box_coords : [lit_row - 1, lit_column];
      movement_flag = true;
    }
  }
  //right
  if (lit_column + 1 < table[lit_row].length && movement_flag == false) {
    if (table[lit_row][lit_column + 1] == VOID_BOX) {
      new_lightbulb_coords =
        step == 1 ? lit_box_coords : [lit_row, lit_column + 1];
      movement_flag = true;
    }
  }
  //down
  if (lit_row + 1 < table.length && movement_flag == false) {
    if (table[lit_row + 1][lit_column] == VOID_BOX) {
      new_lightbulb_coords =
        step == 1 ? lit_box_coords : [lit_row + 1, lit_column];
      movement_flag = true;
    }
  }
  //left
  if (lit_column - 1 != -1 && movement_flag == false) {
    if (table[lit_row][lit_column - 1] == VOID_BOX) {
      new_lightbulb_coords =
        step == 1 ? lit_box_coords : [lit_row, lit_column - 1];
      movement_flag = true;
    }
  }
  if (movement_flag) {
    //move lightbulb
    table[new_lightbulb_coords[0]][new_lightbulb_coords[1]] = LIGHTBULB;
    if (step == 1) {
      //turn off lights in the old place and turn on in the new one
      table[old_lightbulb_coords[0]][old_lightbulb_coords[1]] = VOID_BOX;
      turn_lights_on_or_off(old_lightbulb_coords, false);
      turn_lights_on_or_off(new_lightbulb_coords, true);
    }
    //turn on the new lightbulb
    else turn_lights_on_or_off(new_lightbulb_coords, true);
  }
  return {
    movement: movement_flag,
    lightbulb_coords: new_lightbulb_coords,
    next_step: step == 1 ? 2 : 1,
  };
};

/**
 * Will assign to the boxes of the table different values ​​
 * ( {@link VOID_BOX void box} or {@link lit_BOX lit box}) depending on whether
 * the {@link LIGHTBULB lightbulb} is going to be turned on or off
 * @param ligthbulb_coords Coordinates of the lightbulb in question
 * @param on It can be `true` or `false`, it indicates if we will turn on or off the lightbulb
 */
const turn_lights_on_or_off = (
  ligthbulb_coords: number[],
  on: boolean,
): void => {
  const lightbulb_column: number = ligthbulb_coords[1],
    lightbulb_row: number = ligthbulb_coords[0],
    evaluator: string = on ? VOID_BOX : lit_BOX;

  //up
  for (let row = lightbulb_row; row >= 0; row--) {
    if (table[row][lightbulb_column] == evaluator)
      table[row][lightbulb_column] = on ? lit_BOX : VOID_BOX;
    if (table[row][lightbulb_column] == WALL) break;
  }

  //down
  for (let row = lightbulb_row; row < table.length; row++) {
    if (table[row][lightbulb_column] == evaluator)
      table[row][lightbulb_column] = on ? lit_BOX : VOID_BOX;
    if (table[row][lightbulb_column] == WALL) break;
  }

  //right
  for (
    let column = lightbulb_column;
    column < table[lightbulb_row].length;
    column++
  ) {
    if (table[lightbulb_row][column] == evaluator)
      table[lightbulb_row][column] = on ? lit_BOX : VOID_BOX;
    if (table[lightbulb_row][column] == WALL) break;
  }

  //left
  for (let column = lightbulb_column; column >= 0; column--) {
    if (table[lightbulb_row][column] == evaluator)
      table[lightbulb_row][column] = on ? lit_BOX : VOID_BOX;
    if (table[lightbulb_row][column] == WALL) break;
  }

  //when we turn off lights we re-evaluate the table in case we turn off
  //some that did not correspond
  if (!on) {
    for (let row = 0; row < table.length; row++) {
      for (let column = 0; column < table[row].length; column++) {
        if (table[row][column] == LIGHTBULB) {
          turn_lights_on_or_off([row, column], true);
        }
      }
    }
  }
};

/**
 * Print the table by console
 */
const view_table = (): void => {
  console.log('\n');
  table.forEach((row: string[]) => {
    let actual_row = '';
    row.forEach((colunm) => (actual_row = actual_row + colunm));
    console.log(actual_row);
  });
};

/**
 * It will go through the table in search of all the {@link LIGHTBULB lightbulbs}
 * to give their number by console
 */
const count_lightbulbs = (): void => {
  let count = 0;
  for (let row = 0; row < table.length; row++) {
    for (let column = 0; column < table[row].length; column++) {
      if (table[row][column] == LIGHTBULB) {
        count += 1;
      }
    }
  }
  console.log('\nNumero minimo de bombillos necesarios: ' + count);
  back_to_menu();
};
