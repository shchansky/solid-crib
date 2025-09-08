// ✅ ХОРОШО: Соблюдение ISP - тонкие типы, которые содержат только нужные методы
//
// 1. ✅ КЛИЕНТЫ НЕ ЗАВИСЯТ ОТ МЕТОДОВ, КОТОРЫЕ НЕ ИСПОЛЬЗУЮТ
//    - createCircle возвращает только CircleShape с нужными методами
//    - createRectangle возвращает только RectangleShape с нужными методами
//
// 2. ✅ ТОНКИЕ СПЕЦИАЛИЗИРОВАННЫЕ ТИПЫ
//    - Каждый тип отвечает за одну область
//    - Четкое разделение ответственности
//
// 3. ✅ ДОБРОВОЛЬНАЯ РЕАЛИЗАЦИЯ НУЖНЫХ МЕТОДОВ
//    - Функции возвращают объекты только с методами, которые имеют смысл
//    - Нет бессмысленных реализаций


// Базовый тип для всех фигур - только основные методы
type Shape = {
  getArea: () => number;
  getPerimeter: () => number;
  getInfo: () => string;
};

// Расширенный тип для круга - только методы, специфичные для круга
type CircleShape = Shape & {
  getDiameter: () => number; // ✅ Только для круга
};

// Расширенный тип для прямоугольника - только методы, специфичные для прямоугольника
type RectangleShape = Shape & {
  getDiagonal: () => number; // ✅ Только для прямоугольника
};

// ✅ ISP: Фабричные функции создают объекты только с нужными методами
// 💡 ПРЕИМУЩЕСТВО: Каждая функция возвращает объект с релевантными методами
// 🎯 РЕЗУЛЬТАТ: Нет избыточности и бессмысленных реализаций

function createCircle(radius: number): CircleShape {
  return {
    getArea: () => Math.PI * radius * radius,
    getPerimeter: () => 2 * Math.PI * radius,
    getInfo: () => `Circle: radius=${radius}`,
    getDiameter: () => radius * 2, // ✅ Реализация для круга
  };
}

function createRectangle(width: number, height: number): RectangleShape {
  return {
    getArea: () => width * height,
    getPerimeter: () => 2 * (width + height),
    getInfo: () => `Rectangle: ${width}x${height}`,
    getDiagonal: () => Math.sqrt(width * width + height * height), // ✅ Реализация для прямоугольника
  };
}

// ✅ ISP: Фабрика создает объекты только с нужными полями
// 💡 ПРЕИМУЩЕСТВО: Каждый объект содержит только релевантные поля
// 🎯 РЕЗУЛЬТАТ: Нет избыточности данных
const createShapeFactory = {
  // Фабричная функция для круга
  circle: (radius: number) => {
    const circle = createCircle(radius);
    return {
      area: circle.getArea(),
      perimeter: circle.getPerimeter(),
      info: circle.getInfo(),
      diameter: circle.getDiameter(), // ✅ Только нужные поля для круга
    };
  },

  // Фабричная функция для прямоугольника
  rectangle: (width: number, height: number) => {
    const rectangle = createRectangle(width, height);
    return {
      area: rectangle.getArea(),
      perimeter: rectangle.getPerimeter(),
      info: rectangle.getInfo(),
      diagonal: rectangle.getDiagonal(), // ✅ Только нужные поля для прямоугольника
    };
  },
};

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Нет избыточности данных
// 💡 ПРЕИМУЩЕСТВО: Каждый объект содержит только релевантные поля
// 🎯 РЕЗУЛЬТАТ: Четкая структура данных
const circleData = createShapeFactory.circle(10);
const rectangleData = createShapeFactory.rectangle(4, 6);

export {};
