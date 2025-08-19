// ❌ ПЛОХО: Нарушение OCP - нужно изменять класс для добавления новых фигур
// 
// ПРОБЛЕМЫ:
// 1. НЕ ЗАКРЫТ для изменения - каждый раз при добавлении новой фигуры нужно менять этот класс
// 2. НЕ ОТКРЫТ для расширения - нет возможности добавить новую фигуру без изменения существующего кода
// 3. Нарушение принципа единственной ответственности - класс знает о всех типах фигур
// 4. Сложность тестирования - нужно тестировать весь класс при добавлении новой фигуры
// 5. Риск сломать существующий функционал при добавлении новой фигуры
class BadShapeCalculator {
    calculateArea(shapeType: string, radius?: number, width?: number, height?: number): number {
        if (shapeType === 'circle') {
            if (!radius) throw new Error('Circle needs radius');
            return Math.PI * radius * radius;
            
        } else if (shapeType === 'rectangle') {
            if (!width || !height) throw new Error('Rectangle needs width and height');
            return width * height;
            
        } else if (shapeType === 'triangle') {
            // ❌ НАРУШЕНИЕ OCP: Чтобы добавить треугольник, нужно ИЗМЕНЯТЬ этот класс!
            // Это означает, что класс НЕ ЗАКРЫТ для изменения
            if (!width || !height) throw new Error('Triangle needs base and height');
            return (width * height) / 2;
            
        } else if (shapeType === 'square') {
            // ❌ НАРУШЕНИЕ OCP: Чтобы добавить квадрат, снова ИЗМЕНЯЕМ класс!
            // Каждая новая фигура требует изменения существующего кода
            if (!width) throw new Error('Square needs side');
            return width * width;
        }
        
        throw new Error('Unknown shape type');
    }

    calculatePerimeter(shapeType: string, radius?: number, width?: number, height?: number): number {
        if (shapeType === 'circle') {
            if (!radius) throw new Error('Circle needs radius');
            return 2 * Math.PI * radius;
            
        } else if (shapeType === 'rectangle') {
            if (!width || !height) throw new Error('Rectangle needs width and height');
            return 2 * (width + height);
            
        } else if (shapeType === 'triangle') {
            // ❌ НАРУШЕНИЕ OCP: Снова изменяем класс для треугольника!
            // Дублирование проблемы - тот же класс, тот же метод, те же изменения
            if (!width || !height) throw new Error('Triangle needs sides');
            // Упрощенно - равносторонний треугольник
            return 3 * width;
            
        } else if (shapeType === 'square') {
            // ❌ НАРУШЕНИЕ OCP: И снова изменяем для квадрата!
            // Проблема повторяется в каждом методе класса
            if (!width) throw new Error('Square needs side');
            return 4 * width;
        }
        
        throw new Error('Unknown shape type');
    }
}

// Использование
const badCalculator = new BadShapeCalculator();

console.log('Circle area:', badCalculator.calculateArea('circle', 5));
console.log('Rectangle area:', badCalculator.calculateArea('rectangle', undefined, 4, 6));
console.log('Triangle area:', badCalculator.calculateArea('triangle', undefined, 4, 6));
console.log('Square area:', badCalculator.calculateArea('square', undefined, 5)); 