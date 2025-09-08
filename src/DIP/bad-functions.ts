// ❌ ПЛОХО: Нарушение DIP - функции зависят от конкретных реализаций
//
// 🔄 НАРУШЕНИЕ ОСНОВНОЙ ИДЕИ DIP:
// 1. ❌ ВЫСОКОУРОВНЕВЫЕ ФУНКЦИИ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - calculateArea зависит от конкретных типов Circle, Rectangle
//    - processShapes создает конкретные объекты внутри себя
//
// 2. ❌ НЕТ АБСТРАКЦИЙ
//    - Нет общего типа Shape
//    - Функции работают с конкретными типами
//
// 3. ❌ ФУНКЦИИ СОЗДАЮТ ЗАВИСИМОСТИ ВНУТРИ СЕБЯ
//    - processShapes создает Circle и Rectangle внутри себя
//    - Нет инъекции зависимостей
//
// 4. ❌ СЛОЖНОСТЬ ТЕСТИРОВАНИЯ
//    - Нельзя легко заменить зависимости на моки
//    - Функции жестко связаны с конкретными реализациями
//
// 🚨 ПРОБЛЕМЫ:
// 1. Жесткая связанность - функции зависят от конкретных типов
// 2. Сложность тестирования - нельзя легко заменить зависимости
// 3. Сложность расширения - добавление новых фигур требует изменения функций
// 4. Нарушение принципа инверсии зависимостей - зависимости направлены к конкретным реализациям

// ❌ НАРУШЕНИЕ DIP: Конкретные типы для фигур
// 💡 ЧТО НЕ ТАК: Нет общего интерфейса Shape
type Circle = {
  radius: number;
  getArea: () => number;
  getInfo: () => string;
};

type Rectangle = {
  width: number;
  height: number;
  getArea: () => number;
  getInfo: () => string;
};

// ❌ НАРУШЕНИЕ DIP: Функции создают конкретные объекты
// 💡 ЧТО НЕ ТАК: Функции знают о конкретных типах
// 🎯 РЕШЕНИЕ: Использовать фабрики или инъекцию зависимостей
function createCircle(radius: number): Circle {
  return {
    radius,
    getArea: () => Math.PI * radius * radius,
    getInfo: () => `Circle: radius=${radius}`,
  };
}

// ❌ НАРУШЕНИЕ DIP: Функции создают конкретные объекты
// 💡 ЧТО НЕ ТАК: Функции знают о конкретных типах
// 🎯 РЕШЕНИЕ: Использовать фабрики или инъекцию зависимостей
function createRectangle(width: number, height: number): Rectangle {
  return {
    width,
    height,
    getArea: () => width * height,
    getInfo: () => `Rectangle: ${width}x${height}`,
  };
}

// ❌ НАРУШЕНИЕ DIP: Функции зависят от конкретных типов
// 💡 ЧТО НЕ ТАК: Высокоуровневая функция зависит от низкоуровневых типов
// 🎯 РЕШЕНИЕ: Работать с общим интерфейсом Shape
function calculateArea(shape: Circle | Rectangle): number {
  // ❌ ПРОБЛЕМА: Нужно знать конкретный тип для правильной обработки
  // 💡 ЧТО НЕ ТАК: Функция должна работать с любым объектом, имеющим getArea()
  // 🔧 РЕШЕНИЕ: Использовать общий интерфейс Shape
  if ("radius" in shape) {
    return shape.getArea(); // Circle
  } else {
    return shape.getArea(); // Rectangle
  }
}

// ❌ НАРУШЕНИЕ DIP: Функция создает конкретные объекты внутри себя
// 💡 ЧТО НЕ ТАК: Функция создает конкретные зависимости внутри себя
// 🎯 РЕШЕНИЕ: Принимать зависимости как параметры
function processShapes(): number {
  // ❌ ПРОБЛЕМА: Функция создает конкретные зависимости внутри себя
  // 💡 ЧТО НЕ ТАК: Нельзя легко заменить Circle на мок для тестирования
  // 🎯 РЕШЕНИЕ: Принимать shapes как параметр функции
  const circle = createCircle(5);
  const rectangle = createRectangle(4, 6);

  return calculateArea(circle) + calculateArea(rectangle);
}

// ❌ НАРУШЕНИЕ DIP: Функция для отображения зависит от конкретных типов
// 💡 ЧТО НЕ ТАК: Нужно знать конкретный тип
// 🎯 РЕШЕНИЕ: Работать с общим интерфейсом
function displayShapeInfo(shape: Circle | Rectangle): string {
  // ❌ ПРОБЛЕМА: Нужно знать конкретный тип
  // 💡 ЧТО НЕ ТАК: Функция должна работать с любым объектом, имеющим getArea()
  // 🔧 РЕШЕНИЕ: Использовать общий интерфейс Shape
  if ("radius" in shape) {
    return `Circle area: ${shape.getArea()}`;
  } else {
    return `Rectangle area: ${shape.getArea()}`;
  }
}

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМ: Сложность тестирования
// 💡 ЧТО НЕ ТАК: Нельзя легко заменить зависимости на моки
// 🎯 РЕШЕНИЕ: Использовать интерфейсы и инъекцию зависимостей
function demonstrateTestingProblems() {
  // ❌ ПРОБЛЕМА: Нельзя протестировать с мок-объектами
  // const mockCircle = { radius: 1, getArea: () => 10, getInfo: () => 'Mock' };
  // processShapes(); // Невозможно передать мок-объекты
}

// ❌ ПРОБЛЕМА: Невозможно легко добавить новую фигуру
// 💡 ЧТО НЕ ТАК: Для добавления Triangle нужно изменить все функции
// 🎯 РЕШЕНИЕ: Использовать общий интерфейс Shape
// type Triangle = {
//     side1: number;
//     side2: number;
//     side3: number;
//     getArea: () => number;
//     getInfo: () => string;
// };
//
// function calculateArea(shape: Circle | Rectangle | Triangle): number {
//     // Пришлось бы добавить новую проверку типа
// }

// Использование - демонстрация проблем
// processShapes();
// const circle = createCircle(3);
// const rectangle = createRectangle(2, 4);
// displayShapeInfo(circle);
// displayShapeInfo(rectangle);

export {};
