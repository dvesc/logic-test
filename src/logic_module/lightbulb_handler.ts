const VOID_BOX = '⬜',
  lit_BOX = '🔸',
  WALL = '🧱',
  LIGHTBULB = '💡';
const table = [];

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
