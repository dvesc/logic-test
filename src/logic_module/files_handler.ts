/* eslint-disable @typescript-eslint/no-var-requires */
import { init_process_step_one } from './lightbulb_handler';

const readline = require('readline-sync');
const FS = require('fs'),
  VOID_BOX = '⬜',
  WALL = '🧱',
  TABLE = [];

/**
 * start the program by console
 * @async
 */
export const init_process = async (): Promise<void> => {
  const file_txt = await show_options();
  if (file_txt) build_table(file_txt);
};

/**
 * Reads the 'resources' directory and lists the available txt files,
 * receiving by console the option that the user prefers
 * @async
 * @returns the name of the txt file the user chose
 */
export const show_options = async (): Promise<string | undefined> => {
  let input: string,
    flag = false,
    chosen_file: string;
  const ALL_LOADED_FILES: string[] = await FS.readdirSync('./src/resources'),
    TXT_FILES = [];

  // we ignore all the files that are not .txt
  ALL_LOADED_FILES.forEach((file) => {
    if (/^([a-zA-Z0-9 @#?¿=._-]{1,})?\.txt$/.test(file)) TXT_FILES.push(file);
  });

  while (!flag) {
    console.log('\n----ARCHIVOS .TXT DISPONIBLES----');
    if (TXT_FILES.length != 0) {
      TXT_FILES.forEach((file, index) => {
        console.log(`${index + 1}- ${file}`);
      });
      input = readline.question('\nDigite la opcion que desea procesar: ');

      //if option enters the range
      if (/^-?\d+$/.test(input)) {
        const option: number = parseInt(input);
        //if the option enters the range
        if (option > 0 && option <= TXT_FILES.length) {
          chosen_file = TXT_FILES[option - 1];
          flag = true;
        } else
          console.log(
            '\n[ERROR]: No es una opcion valida, intentelo nuevamante\n',
          );
      } else
        console.log('\n[ERROR]: Deber ser un numero, intentelo nuevamente\n');
    } else {
      console.log(
        '[INFO]: Parece que no hay archivos .txt en el directorio "src/resources".' +
          ' Debe guardar el archivo txt en dicho directorio y reiniciar el programa',
      );
      flag = true;
    }
  }

  return chosen_file;
};

/**
 * Read the .txt file in the specified directory to later create an array with
 * equivalent emojis, to start the calculation process call {@link init_process_step_one init_process_step_one() }
 * @param file_name name of the .txt file selected by the user
 */
const build_table = (file_name: string): void => {
  FS.readFile(`./src/resources/${file_name}`, 'utf-8', (err, data: string) => {
    const BINARI_TABLE: string[] = data.split('\n');
    //rows
    for (let i = 0; i < BINARI_TABLE.length; i++) {
      const COLUMNS: string[] = BINARI_TABLE[i].split('');
      TABLE[i] = []; //that element will be an array
      //columns
      for (let j = 0; j < COLUMNS.length; j++) {
        const elem: string = COLUMNS[j];
        TABLE[i][j] = elem == '0' ? VOID_BOX : WALL;
      }
    }
    init_process_step_one(TABLE);
  });
};
