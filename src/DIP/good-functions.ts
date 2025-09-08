// ✅ ХОРОШО: Соблюдение DIP - функции зависят от абстракций, а не от конкретных реализаций
//
// 📋 ОСНОВНАЯ ИДЕЯ DIP:
// 1. ✅ ВЫСОКОУРОВНЕВЫЕ ФУНКЦИИ НЕ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - calculateArea, displayInfo зависят от типа Shape (абстракция)
//    - НЕ зависят от конкретных типов Circle, Rectangle
//
// 2. ✅ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые функции: calculateArea зависит от Shape
//    - Низкоуровневые функции: createCircle, createRectangle возвращают Shape
//
// 3. ✅ АБСТРАКЦИИ НЕ ЗАВИСЯТ ОТ ДЕТАЛЕЙ
//    - Интерфейс Shape не знает о конкретных реализациях
//    - Абстракция стабильна и редко изменяется
//
// 4. ✅ ДЕТАЛИ ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Конкретные объекты реализуют интерфейс Shape
//    - Зависимости направлены к абстракциям
//
// ✨ ПРЕИМУЩЕСТВА:
// 1. Слабая связанность - функции зависят от абстракций
// 2. Легкость тестирования - можно легко заменить зависимости
// 3. Простота расширения - добавление новых типов не требует изменения функций
// 4. Полиморфизм - код работает с любыми объектами, реализующими интерфейс
// 5. Инверсия зависимостей - зависимости направлены к абстракциям

// ✅ DIP: Абстракция (тип) - высокоуровневые функции зависят от неё
// 💡 ПРЕИМУЩЕСТВО: Интерфейс определяет контракт, но не знает о деталях реализации
// 🎯 РЕЗУЛЬТАТ: Стабильная абстракция, которая редко изменяется
type Shape = {
  getArea: () => number;
  getInfo: () => string;
};

// ✅ DIP: Конкретные реализации - низкоуровневые функции создают объекты
// 💡 ПРЕИМУЩЕСТВО: Каждая функция возвращает объект, реализующий интерфейс Shape
// 🎯 РЕЗУЛЬТАТ: Все фигуры можно использовать одинаково через интерфейс
function createCircle(radius: number): Shape {
  return {
    getArea: () => Math.PI * radius * radius,
    getInfo: () => `Circle: radius=${radius}`,
  };
}

function createRectangle(width: number, height: number): Shape {
  return {
    getArea: () => width * height,
    getInfo: () => `Rectangle: ${width}x${height}`,
  };
}

// ✅ DIP: Высокоуровневые функции зависят от абстракции
// 💡 ПРЕИМУЩЕСТВО: Функции не знают о конкретных типах фигур
// 🎯 РЕЗУЛЬТАТ: Можно работать с любыми объектами, реализующими Shape
function calculateArea(shape: Shape): number {
  // ✅ Работаем с абстракцией Shape, а не с конкретными типами
  // 💡 ПРЕИМУЩЕСТВО: Полиморфизм - работает с любыми фигурами
  // 🎯 РЕЗУЛЬТАТ: Не нужно знать конкретный тип фигуры
  return shape.getArea();
}

function displayShapeInfo(shape: Shape): string {
  // ✅ Работаем с абстракцией Shape, а не с конкретными типами
  // 💡 ПРЕИМУЩЕСТВО: Полиморфизм - работает с любыми фигурами
  // 🎯 РЕЗУЛЬТАТ: Не нужно знать конкретный тип фигуры
  return `${shape.getInfo()} - Area: ${shape.getArea().toFixed(2)}`;
}

// ✅ DIP: Функция работает с абстракцией
// 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретные типы фигур
// 🎯 РЕЗУЛЬТАТ: Полиморфизм работает автоматически
function findLargestShape(shapes: Shape[]): Shape | null {
  if (shapes.length === 0) return null;

  return shapes.reduce((largest, current) => {
    return current.getArea() > largest.getArea() ? current : largest;
  });
}

function processShapes(shapes: Shape[]): {
  infos: string[];
  largest: Shape | null;
} {
  const infos: string[] = [];
  shapes.forEach((shape) => {
    infos.push(displayShapeInfo(shape));
  });

  const largest = findLargestShape(shapes);

  return { infos, largest };
}

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Легкость тестирования
// 💡 ПРЕИМУЩЕСТВО: Можно создать мок-объекты для тестирования
// 🎯 РЕЗУЛЬТАТ: Изолированное тестирование компонентов
function createMockShape(area: number, info: string): Shape {
  return {
    getArea: () => area,
    getInfo: () => info,
  };
}

// Использование - демонстрация правильного применения DIP
// Создание фигур (лучше было бы сделать через DI контейнер)
const circle = createCircle(5);
const rectangle = createRectangle(4, 6);

// ✅ DIP: Высокоуровневые функции работают с абстракциями
// 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретные типы
// 🎯 РЕЗУЛЬТАТ: Гибкость и расширяемость
displayShapeInfo(circle);
displayShapeInfo(rectangle);
processShapes([circle, rectangle]);

export {};
