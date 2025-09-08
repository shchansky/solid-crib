// ❌ ПЛОХО: Нарушение OCP - нужно изменять класс для добавления новых фигур
//
// 📋 НАРУШЕНИЕ ОСНОВНОЙ ИДЕИ OCP:
// 1. ❌ НЕ ЗАКРЫТ для изменения - каждый раз при добавлении новой фигуры нужно менять этот класс
// 2. ❌ НЕ ОТКРЫТ для расширения - нет возможности добавить новую фигуру без изменения существующего кода
// 3. ❌ ДЛИННЫЕ ЦЕПОЧКИ IF-ELSE - нарушение принципа единственной ответственности
// 4. ❌ ЗАВИСИМОСТЬ ОТ КОНКРЕТНЫХ ТИПОВ - код знает о всех возможных фигурах
//
// 🚨 ПРОБЛЕМЫ:
// 1. НЕ ЗАКРЫТ для изменения - каждый раз при добавлении новой фигуры нужно менять этот класс
// 2. НЕ ОТКРЫТ для расширения - нет возможности добавить новую фигуру без изменения существующего кода
// 3. Нарушение принципа единственной ответственности - класс знает о всех типах фигур
// 4. Сложность тестирования - нужно тестировать весь класс при добавлении новой фигуры
// 5. Риск сломать существующий функционал при добавлении новой фигуры

// ❌ НАРУШЕНИЕ OCP: Класс, который нужно изменять для добавления новых фигур
// 💡 ЧТО НЕ ТАК: Класс содержит логику для всех типов фигур
// 🔧 РЕШЕНИЕ: Использовать полиморфизм и интерфейсы
class ShapeCalculator {
  // ❌ НАРУШЕНИЕ OCP: Метод, который нужно изменять для каждой новой фигуры
  // 💡 ЧТО НЕ ТАК: Длинная цепочка if-else с проверкой типов
  // 🎯 РЕШЕНИЕ: Использовать полиморфизм - каждый объект сам знает, как вычислять площадь
  calculateArea(
    shapeType: string,
    radius?: number,
    width?: number,
    height?: number
  ): number {
    if (shapeType === "circle") {
      if (!radius) throw new Error("Circle needs radius");
      return Math.PI * radius * radius;
    } else if (shapeType === "rectangle") {
      if (!width || !height)
        throw new Error("Rectangle needs width and height");
      return width * height;
    } else if (shapeType === "triangle") {
      // ❌ НАРУШЕНИЕ OCP: Чтобы добавить треугольник, нужно ИЗМЕНЯТЬ этот класс!
      // 💡 ЧТО НЕ ТАК: Это означает, что класс НЕ ЗАКРЫТ для изменения
      // 🎯 РЕШЕНИЕ: Triangle должен быть отдельным классом с методом getArea()
      if (!width || !height) throw new Error("Triangle needs base and height");
      return (width * height) / 2;
    } else if (shapeType === "square") {
      // ❌ НАРУШЕНИЕ OCP: Чтобы добавить квадрат, снова ИЗМЕНЯЕМ класс!
      // 💡 ЧТО НЕ ТАК: Каждая новая фигура требует изменения существующего кода
      // 🎯 РЕШЕНИЕ: Square должен быть отдельным классом с методом getArea()
      if (!width) throw new Error("Square needs side");
      return width * width;
    }

    throw new Error("Unknown shape type");
  }

  // ❌ НАРУШЕНИЕ OCP: Тот же метод, те же проблемы
  // 💡 ЧТО НЕ ТАК: Дублирование логики проверки типов
  // 🎯 РЕШЕНИЕ: Каждый объект сам знает, как вычислять периметр
  calculatePerimeter(
    shapeType: string,
    radius?: number,
    width?: number,
    height?: number
  ): number {
    if (shapeType === "circle") {
      if (!radius) throw new Error("Circle needs radius");
      return 2 * Math.PI * radius;
    } else if (shapeType === "rectangle") {
      if (!width || !height)
        throw new Error("Rectangle needs width and height");
      return 2 * (width + height);
    } else if (shapeType === "triangle") {
      // ❌ НАРУШЕНИЕ OCP: Снова изменяем класс для треугольника!
      // 💡 ПРОБЛЕМА: Дублирование проблемы - тот же класс, тот же метод, те же изменения
      // 🎯 РЕШЕНИЕ: Triangle должен быть отдельным классом с методом getPerimeter()
      if (!width || !height) throw new Error("Triangle needs sides");
      // Упрощенно - равносторонний треугольник
      return 3 * width;
    } else if (shapeType === "square") {
      // ❌ НАРУШЕНИЕ OCP: И снова изменяем для квадрата!
      // 💡 ЧТО НЕ ТАК: Проблема повторяется в каждом методе класса
      // 🎯 РЕШЕНИЕ: Square должен быть отдельным классом с методом getPerimeter()
      if (!width) throw new Error("Square needs side");
      return 4 * width;
    }

    throw new Error("Unknown shape type");
  }

  // ❌ ПРОБЛЕМА: Невозможно добавить новую фигуру без изменения класса
  // 💡 ЧТО НЕ ТАК: Для добавления Ellipse нужно изменить все методы
  // 🔧 РЕШЕНИЕ: Использовать интерфейс Shape и полиморфизм
  // calculateArea(shapeType: string, ...) {
  //     if (shapeType === 'ellipse') {
  //         // Пришлось бы добавить новую ветку
  //     }
  // }
}

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМ: Сложность добавления новых фигур
// 💡 ЧТО НЕ ТАК: Каждая новая фигура требует изменения существующего кода
// 🎯 РЕЗУЛЬТАТ: Риск сломать работающий функционал
const calculator = new ShapeCalculator();

const circleArea = calculator.calculateArea("circle", 5);
const rectangleArea = calculator.calculateArea("rectangle", undefined, 4, 6);
const triangleArea = calculator.calculateArea("triangle", undefined, 4, 6);
const squareArea = calculator.calculateArea("square", undefined, 5);

// ❌ ПРОБЛЕМА: Нельзя легко добавить новую фигуру
// const ellipseArea = calculator.calculateArea('ellipse', 5, 3); // ❌ Нужно изменять класс!

export {};
