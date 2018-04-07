import cv2
import aircv
import numpy
partImg = aircv.imread("D:/part.png")
allImg = aircv.imread("D:/all.png")
match_result = aircv.find_template(allImg, partImg, 0.6)
print(match_result)
data = match_result["rectangle"]
points = numpy.array([data[0], data[1], data[3], data[2]], numpy.int)
cv2.polylines(allImg, [points], True, (0, 0, 255), 2)

cv2.imwrite("D:/result.png", allImg)

cv2.imshow("pic", allImg)
key = cv2.waitKey(0)
if 27 == key:
    print("ecs")
    cv2.destroyAllWindows()
