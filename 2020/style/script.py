"""
#logo path:nth-child(3) {
    stroke-dasharray: 848;
    stroke-dashoffset: 848;
    animation: line-anim 0.4s linear forwards;
    animation-delay: 0.4s;
}
"""

waves = [3,2,1,5,4,8,7,6,10,9]
wave_lens = [848.34,1392.91,2225.91,1392.68,848.34,848.34,1392.68,2225.91,1392.68,848.33] 

lines = [23,13,18,28,22,12,17,27,21,11,16,26,25,15,20,30,24, 14,19,29]
line_lens = [335.27,587,589,338,585,1025,1028,590,986,1729,1735,995,585,1025,1028,590,335,587,589,338]




def gen(n):
    open("animation.css", "w").close()
    f = open("animation.css", "w")
    for i in range(len(waves)):
        if i < 5:
            if i % 2 == 0:
                f.write("#logo path:nth-child(%d) {\n" % waves[i])
                f.write("   stroke-dasharray: %f;" % (wave_lens[i]))
                f.write("   stroke-dashoffset: %f;\n" % (wave_lens[i]))
                f.write("   animation: line-anim %.2fs linear forwards;\n" % n)
                f.write("   animation-delay: %.2fs;\n" % (n * i))
            else:
                f.write("#logo path:nth-child(%d) {\n" % waves[i+5])
                f.write("   stroke-dasharray: %f;" % (wave_lens[i+5]))
                f.write("   stroke-dashoffset: -%f;\n" % (wave_lens[i+5]))
                f.write("   animation: line-anim %.2fs linear forwards;\n" % n)
                f.write("   animation-delay: %.2fs;\n" % (n * i))
        else:
            if i % 2 != 0:
                f.write("#logo path:nth-child(%d) {\n" % waves[14-i])
                f.write("   stroke-dasharray: %f;" % (wave_lens[14-i]))
                f.write("   stroke-dashoffset: %f;\n" % (wave_lens[14-i]))
                f.write("   animation: line-anim %.2fs linear forwards;\n" % n)
                f.write("   animation-delay: %.2fs;\n" % (n * (i-5)))
            else:
                f.write("#logo path:nth-child(%d) {\n" % waves[9-i])
                f.write("   stroke-dasharray: %f;" % (wave_lens[9-i]))
                f.write("   stroke-dashoffset: -%f;\n" % (wave_lens[9-i]))
                f.write("   animation: line-anim %.2fs linear forwards;\n" % n)
                f.write("   animation-delay: %.2fs;\n" % (n * (i-5)))
            

        f.write("}\n\n")

    k = 1
    for i in range(len(lines)):
        f.write("#logo path:nth-child(%d) {\n" % lines[i])
        f.write("   stroke-dasharray: %d;" % (line_lens[i]+1))
        if k == 2 or k == 3:
            f.write("   stroke-dashoffset: -%d;\n" % (line_lens[i]+1))
        else:
            f.write("   stroke-dashoffset: %d;\n" % (line_lens[i]+1))
        f.write("   animation: line-anim %.2fs ease-out forwards;\n" % (n+0.2))
        # f.write("   animation-direction: alternate\n")
        f.write("   animation-delay: %.2fs;\n" % 0.8)
        f.write("}\n\n")
        k += 1
        if k == 5:
            k = 1
    f.close()




gen(0.2)